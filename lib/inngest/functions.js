import { db } from "@/lib/prisma";
import { inngest } from "./client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateIndustryInsights = inngest.createFunction(
  { name: "Generate Industry Insights" },
  { cron: "0 0 */2 * *" }, // Every 2 days at midnight
  async ({ event, step }) => {
    const industries = await step.run("Fetch industries", async () => {
      return await db.industryInsight.findMany({
        select: { industry: true },
      });
    });

    for (const { industry } of industries) {
      const prompt = `
        Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
        {
          "salaryRanges": [
            { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
          ],
          "growthRate": number,
          "demandLevel": "High" | "Medium" | "Low",
          "topSkills": ["skill1", "skill2"],
          "marketOutlook": "Positive" | "Neutral" | "Negative",
          "keyTrends": ["trend1", "trend2"],
          "recommendedSkills": ["skill1", "skill2"]
        }

        IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
        Include at least 5 common roles for salary ranges.
        Growth rate should be a percentage.
        Include at least 10 skills and 5 trends.
      `;

      const res = await step.ai.wrap(
        "gemini",
        async (p) => await model.generateContent(p),
        prompt
      );

      const text = res.response.candidates[0]?.content.parts[0]?.text || "";
      const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

      let insights;
      try {
        insights = JSON.parse(cleanedText);
      } catch (e) {
        console.error(`Failed to parse insights for ${industry}:`, cleanedText);
        continue; // Skip this industry if parsing fails
      }

      // ✅ Normalize enums to match Prisma schema
      if (insights.demandLevel) insights.demandLevel = insights.demandLevel.toUpperCase();
      if (insights.marketOutlook) insights.marketOutlook = insights.marketOutlook.toUpperCase();

      await step.run(`Update ${industry} insights`, async () => {
        await db.industryInsight.update({
          where: { industry },
          data: {
            ...insights,
            lastUpdated: new Date(),
            nextUpdate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          },
        });
      });
    }
  }
);
