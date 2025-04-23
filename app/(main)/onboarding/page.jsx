import { industries } from "@/data/industries"
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation"
import OnboardingForm from "./_components/onboardingForm"
const OnboardingPage =async () => {
    //check if user is alreasdy onboarded
   const {isOnboarded}= await getUserOnboardingStatus();
   if(isOnboarded){
    return redirect("/dashboard")
   }
  return (
    <main>
        <OnboardingForm industries={industries}/>
    </main>
  )
}

export default OnboardingPage