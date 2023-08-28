import { Progress } from "@material-tailwind/react";

const ProgressCustomStyles = () => {
  return (
    <Progress
      value={25}
      size="lg"
      className="border border-gray-900/10 bg-gray-900/5 p-1"
    />
  );
};
export default ProgressCustomStyles;
