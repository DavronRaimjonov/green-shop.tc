import { Result } from "antd";

const About = () => {
  return (
    <div>
      <Result
        status="404"
        title="Information is missing!"
        subTitle="Information has not been revealed by user, or account switched to private mode."
      />
    </div>
  );
};

export default About;
