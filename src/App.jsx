import { ReportsPage } from "./import";

import { ReportsPage } from "./import.js";
import AddAttach from "./component/forms/fileInput/addAttach";
import Listinput from "./component/forms/listInput/Listinput";
import Error from "./models/Error";
import Success from "./models/Success";

function App() {
  return (
    <>
      {/* <AddAttach /> */}
      <ReportsPage />
      <Listinput />
    </>
  );
}

export default App;
