import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ReportsHeader from "../../custom hooks/ReportsHeader";
import Textarea from "../forms/inputs/Textarea";
import Listinput from "../forms/listInput/Listinput";
import { PlusOutlined } from "@ant-design/icons";
import Location from "../forms/inputs/Location";
import location from "../../../src/assets/icons/location@2x.png";
import arrowDown from "../../../src/assets/icons/arrow down.svg";
import Datepicker from "../forms/inputs/datepicker";
import AddAttach from "../forms/fileInput/addAttach";

const ReportDetails = ({ control, errors }) => {
  return (
    <>
      <ReportsHeader
        title={"تفاصيل البلاغ"}
        subTitle={"يُرجي ملئ الحقول التالية"}
      />
      <div className="px-8 pt-4 pb-8  space-y-6">
        <Textarea errors={errors} control={control} />
        <Location
          title={"InputControl"}
          errors={errors}
          control={control}
          src={arrowDown}
          inpTitle={"هل انت على علم باسماء المشتبه بهم؟"}
          inputPlaceholder={"نعم/لا"}
        />
        <Listinput icon={<PlusOutlined />} control={control} errors={errors} />
        <div className="flex items-center gap-6 flex-wrap pb-4">
          <Datepicker control={control} errors={errors} />
          <Location
            title={"locationInputControl"}
            errors={errors}
            control={control}
            width={24}
            src={location}
            inpTitle={"مكان حدوث المخالفة"}
            inputPlaceholder={"شارع"}
          />
        </div>
        <AddAttach errors={errors} control={control} />
      </div>
    </>
  );
};

export default ReportDetails;
