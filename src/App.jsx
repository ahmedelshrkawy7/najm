import { ReportsPage } from "./import";

import AddAttach from "./component/forms/fileInput/addAttach";
import Listinput from "./component/forms/listInput/Listinput";
import Error from "./models/Error";
import Success from "./models/Success";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, Select, Space } from "antd";

function App() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      select: {},
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <>
      {/* <AddAttach /> */}
      <ReportsPage />
    </>
  );
}

export default App;
