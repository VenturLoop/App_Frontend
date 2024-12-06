import splashScreen1 from "../../assets/images/splash_one.png";
import splashScreen2 from "../../assets/images/splash_two.png";
import splashScreen3 from "../../assets/images/splash_three.png";

export const images = {
  splashScreen1,
  splashScreen2,
  splashScreen3,
};

export const splashScreensWelcome = [
  {
    id: 1,
    title: "Receive daily cofounder recomendation",
    description:
      "Recommendations are updated in a daily basis. Recommendations will be refined based on your preference and who you’ve invited to connect.",
    image: images.splashScreen1,
  },
  {
    id: 2,
    title: "Get Matches by sending or accepting invites",
    description:
      "Once you’ve matched, a message thread will be created between both of you to kickstart the conversation",
    image: images.splashScreen2,
  },
  {
    id: 3,
    title: "Better recommendations through advanced filters",
    description:
      "Complete your profile to stand out ! And update your preferences to find your ideal matches",
    image: images.splashScreen3,
  },
];

export const data = {
  splashScreensWelcome,
};
