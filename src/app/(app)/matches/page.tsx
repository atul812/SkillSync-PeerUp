
import { RecommendationsDisplay } from "@/components/dashboard/RecommendationsDisplay";
import { mockUserProfile } from "@/lib/mock-data";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function MatchesPage() {
  // In a real app, fetch the current user's profile
  const userProfile = mockUserProfile;

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">Find Skill Matches</h1>
      <p className="text-muted-foreground">
        Discover peers with complementary skills. Our AI will help you find the best learning partners.
      </p>
       <Alert variant="default" className="bg-blue-50 border-blue-300 text-blue-700">
        <AlertTriangle className="h-4 w-4 !text-blue-700" />
        <AlertTitle>Tip!</AlertTitle>
        <AlertDescription>
          Keep your profile's "Skills to Teach" and "Skills to Learn" updated for the most relevant matches.
          The more specific you are, the better the recommendations!
        </AlertDescription>
      </Alert>
      <RecommendationsDisplay currentUserProfile={userProfile} />
    </div>
  );
}
