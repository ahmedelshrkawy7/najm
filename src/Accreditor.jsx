/* eslint-disable no-unused-vars */
import { Collapse, Input, Button, Breadcrumb } from "antd";
import {
  EditOutlined,
  FileTextOutlined,
  WarningOutlined,
  TeamOutlined,
  FileDoneOutlined,
  DownOutlined,
  CheckCircleOutlined,
  HomeFilled,
  FormOutlined,
} from "@ant-design/icons";
import {
  Link,
  Navigate,
  useLocation,
  useMatches,
  useNavigate,
} from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import useApi from "./utils/useApi";
import { QueryClient, useMutation, useQuery } from "react-query";
import { errorNotf, successNotf } from "./utils/notifications/Toast";

const { Panel } = Collapse;

const Accreditor = () => {
  const matches = useMatches();
  let navigate = useNavigate();
  let location = useLocation();
  let id = location.search.split("=")[1];

  let queryClient = new QueryClient();
  const { postData, getData } = useApi();
  const { data: { data = {} } = {} } = useQuery(
    ["admin", ["/reports/initial-study"], id],
    getData
  );
  const Post = useMutation(postData, {
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries(["admin", ["/reports"], id]);
      // queryClient.invalidateQueries(["users", ["/reports"], id]);
      navigate(`/dash/${id}`);
      successNotf(data.message);
    },
    onError: ({ message }) => {
      // console.log("🚀 ~ Reports ~ message:", message);
      errorNotf(message);
    },
  });

  console.log("🚀 ~ Accreditor ~ data:", data);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      action: "add_notes_to_the_preliminary_study",
      _method: "PUT",
      primary_study_note: "",
      risk_assessment_note: "",
      risk_type_note: "",
      category_notes: "",
    },
  });

  if (!id || data?.status === "under_process") {
    return <Navigate to={"/dash"} replace />;
  }

  const breadcrumbs = matches
    .filter((match) => match.handle && match.handle.crumb)
    .map((match) => {
      console.log("🚀 ~ .map ~ match:", match);
      return {
        id: match.id,
        title: (
          <Link className="hover:!bg-white" to={redirectCrumb(match.pathname)}>
            <span className="text-black text-[16px] font-medium">
              {match.handle.crumb}
            </span>
          </Link>
        ),
        path: match.pathname,
      };
    });

  breadcrumbs.push({
    title: (
      <span className="text-black/60 text-[16px] font-medium">
        تفاصيل البلاغ
      </span>
    ),
  });

  function redirectCrumb(path) {
    return path === "/acc" ? `/dash/${id}` : path === "/" ? "/dash" : path;
  }

  const onSubmit = (val) => {
    console.log(val, "dddddddd");
    Post.mutate([`/reports/${id}`, val]);
  };

  return (
    <div className="w-[90%] mx-auto mt-24 mb-6 p-4">
      <div className="flex gap-2 items-center mb-6">
        <HomeFilled className="self-center" />
        <Breadcrumb separator=">" items={breadcrumbs} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between mb-4">
          {/* Report Number Field */}
          <div className="flex items-center">
            <div className="border border-light rounded-lg shadow-sm p-2">
              <label className="font-semibold text-sm text-[#33835c]">
                رقم البلاغ: <span className="text-black">{id}</span>
              </label>
            </div>
          </div>

          {/* Send Notes Button */}
        </div>
        <div className="bg-white rounded-lg shadow-md">
          {/* Header */}
          <div className="bg-[#33835c] p-4 text-white text-lg font-bold rounded-t-lg">
            إضافة ملاحظات على الدراسة الأولية
          </div>

          {/* Collapse Panel */}
          <Collapse
            defaultActiveKey={["1"]}
            expandIconPosition="end"
            className="p-4 bg-[#E6E6E6] rounded-lg"
          >
            <Panel
              header="الدراسة الأولية"
              key="1"
              className="text-right text-lg font-semibold"
              extra={<CheckCircleOutlined className="text-[#33835c]" />}
            >
              {/* Form Fields */}
              <div className="space-y-6 bg-[#E6E6E6]">
                {/* First Field (تصنيف البلاغ) */}
                <div className="flex flex-col space-y-3">
                  {/* Label and Value */}
                  <div className="flex items-center gap-2">
                    {/* Circle Icon */}
                    <div
                      className="text-white rounded-full h-8 w-8 flex justify-center items-center text-xs"
                      style={{ backgroundColor: "#33835c" }}
                    >
                      <FileTextOutlined />
                    </div>
                    <label className="font-semibold text-sm">
                      تصنيف البلاغ:
                    </label>
                    <span className="text-sm">
                      {data?.report_classification?.name}
                    </span>
                  </div>

                  {/* Notes Input */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center">
                      {/* <span className="w-3 h-3 bg-[#33835c] rounded-full mr-2"></span> */}
                      <FormOutlined className="text-[#33835c] mr-0" />
                      <label className="font-semibold text-sm pr-2 mt-1">
                        الملاحظات:
                      </label>
                    </div>
                    <Controller
                      name="category_notes"
                      control={control}
                      rules={{ required: "هذا الحقل مطلوب" }}
                      render={({ field }) => (
                        <Input.TextArea
                          {...field}
                          placeholder="اكتب الملاحظة هنا..."
                          className="rounded-lg h-10 flex-1"
                          rows={4}
                          style={{ resize: "none" }}
                        />
                      )}
                    />
                    {errors?.category_notes && (
                      <span className="text-red-500 text-sm">
                        {errors?.category_notes?.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Second Field (نوع البلاغ) */}
                <div className="flex flex-col space-y-3">
                  {/* Label and Value */}
                  <div className="flex items-center gap-2">
                    <div
                      className="text-white rounded-full h-8 w-8 flex justify-center items-center text-xs"
                      style={{ backgroundColor: "#33835c" }}
                    >
                      <WarningOutlined />
                    </div>
                    <label className="font-semibold text-sm">نوع البلاغ:</label>
                    <span className="text-sm">{data?.report_type?.name} </span>
                  </div>

                  {/* Notes Input.TextArea */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center">
                      {/* <span className="w-3 h-3 bg-[#33835c] rounded-full mr-2"></span> */}
                      <FormOutlined className="text-[#33835c] mr-0" />
                      <label className="font-semibold text-sm pr-2 mt-1">
                        الملاحظات:
                      </label>
                    </div>
                    <Controller
                      name="risk_type_note"
                      control={control}
                      rules={{ required: "هذا الحقل مطلوب" }}
                      render={({ field }) => (
                        <Input.TextArea
                          {...field}
                          placeholder="اكتب الملاحظة هنا..."
                          className="rounded-lg h-10 flex-1"
                          rows={4}
                          style={{ resize: "none" }}
                        />
                      )}
                    />
                    {errors?.risk_type_note && (
                      <span className="text-red-500 text-sm">
                        {errors?.risk_type_note?.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Third Field (تقييم مخاطر البلاغ) */}
                <div className="flex flex-col space-y-3">
                  {/* Label and Button */}
                  <div className="flex items-center gap-2 pb-2">
                    <div
                      className="text-white rounded-full h-8 w-8 flex justify-center items-center text-xs"
                      style={{ backgroundColor: "#33835c" }}
                    >
                      <FileDoneOutlined />
                    </div>
                    <label className="font-semibold text-sm">
                      تقييم مخاطر البلاغ:
                    </label>
                    <span className="text-sm">{data?.risk_assessment}</span>
                    {/* <Button className="w-fit flex justify-center items-center rounded-lg bg-[#33835c] text-white border-none px-7">
                      <DownOutlined /> اداة تقييم المخاطر
                    </Button> */}
                  </div>

                  {/* Notes Input.TextArea */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center">
                      {/* <span className="w-3 h-3 bg-[#33835c] rounded-full mr-2"></span> */}
                      <FormOutlined className="text-[#33835c] mr-0" />
                      <label className="font-semibold text-sm pr-2 mt-1">
                        الملاحظات:
                      </label>
                    </div>
                    <Controller
                      name="risk_assessment_note"
                      control={control}
                      rules={{ required: "هذا الحقل مطلوب" }}
                      render={({ field }) => (
                        <Input.TextArea
                          {...field}
                          placeholder="اكتب الملاحظة هنا..."
                          className="rounded-lg h-10 flex-1"
                          rows={4}
                          style={{ resize: "none" }}
                        />
                      )}
                    />
                    {errors?.risk_assessment_note && (
                      <span className="text-red-500 text-sm">
                        {errors?.risk_assessment_note?.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Fourth Field (الإدارة المعنية بدراسة البلاغ) */}
                <div className="flex flex-col space-y-3">
                  {/* Label and Value */}
                  <div className="flex items-center gap-2">
                    <div
                      className="text-white rounded-full h-8 w-8 flex justify-center items-center text-xs"
                      style={{ backgroundColor: "#33835c" }}
                    >
                      <TeamOutlined />
                    </div>
                    <label className="font-semibold text-sm">
                      الإدارة المعنية بدراسة البلاغ:
                    </label>
                    <span className="text-sm">{data?.department?.name}</span>
                  </div>

                  {/* Notes Input.TextArea */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center">
                      {/* <span className="w-3 h-3 bg-[#33835c] rounded-full mr-2"></span> */}
                      <FormOutlined className="text-[#33835c] mr-0" />
                      <label className="font-semibold text-sm pr-2 mt-1">
                        الملاحظات:
                      </label>
                    </div>
                    <Controller
                      name="department_note"
                      control={control}
                      rules={{ required: "هذا الحقل مطلوب" }}
                      render={({ field }) => (
                        <Input.TextArea
                          {...field}
                          placeholder="اكتب الملاحظة هنا..."
                          className="rounded-lg h-10 flex-1"
                          rows={4}
                          style={{ resize: "none" }}
                        />
                      )}
                    />
                    {errors?.department_note && (
                      <span className="text-red-500 text-sm">
                        {errors?.department_note?.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Fifth Field (نتائج الدراسة الأولية للبلاغ) */}
                <div className="flex flex-col space-y-3">
                  {/* Label and Value */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <div
                      className="text-white rounded-full h-8 w-8 flex justify-center items-center text-xs"
                      style={{ backgroundColor: "#33835c" }}
                    >
                      <EditOutlined />
                    </div>
                    <label className="font-semibold text-sm">
                      نتائج الدراسة الأولية للبلاغ:
                    </label>
                    <span className="text-sm text-justify">{data?.result}</span>
                  </div>

                  {/* Notes Input.TextArea */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center flex-wrap">
                      {/* <span className="w-3 h-3 bg-[#33835c] rounded-full mr-2"></span> */}
                      <FormOutlined className="text-[#33835c] mr-0" />
                      <label className="font-semibold text-sm pr-2 mt-1">
                        الملاحظات:
                      </label>
                    </div>
                    <Controller
                      name="primary_study_note"
                      control={control}
                      rules={{ required: "هذا الحقل مطلوب" }}
                      render={({ field }) => (
                        <Input.TextArea
                          {...field}
                          placeholder="اكتب الملاحظة هنا."
                          className="rounded-lg flex-1"
                          rows={4}
                          style={{ resize: "none" }}
                        />
                      )}
                    />
                    {errors?.primary_study_note && (
                      <span className="text-red-500 text-sm">
                        {errors?.primary_study_note?.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Panel>
          </Collapse>
        </div>
        <div className="py-5  w-[100%]   text-left">
          <button
            onClick={() => {
              navigate(`/dash/${id}`);
            }}
            className={`bg-[#33835C] !bg-transparent !text-[#33835C] border-2 border-[#33835C] font-bold p-2 rounded-md `}
          >
            {"رجوع"}
          </button>
          <button
            className="rounded-lg bg-[#33835c] text-white border-2 p-2 mr-4"
            type="submit"
          >
            إرسال ملاحظات
          </button>
        </div>
      </form>
    </div>
  );
};

export default Accreditor;
