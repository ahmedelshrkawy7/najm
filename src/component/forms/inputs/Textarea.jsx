import { Input } from "antd";
const { TextArea } = Input;

const Textarea = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2> this is text Area</h2>
      </div>
      <TextArea
        rows={4}
        className=" hover:border-green-500 focus:border-green-500  "
      />
    </div>
  );
};

export default Textarea;
