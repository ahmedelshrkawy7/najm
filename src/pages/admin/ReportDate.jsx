/* eslint-disable no-unused-vars */
import { Space, Table, Tag, Tooltip } from "antd";
import {
  Link,
  useLocation,
  useMatches,
  useNavigate,
  useParams,
} from "react-router-dom";
import useApi from "../../utils/useApi";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { Breadcrumb } from "../../import";
import { HomeFilled } from "@ant-design/icons";

const ReportDate = () => {
  const matches = useMatches();
  const breadcrumbs = matches
    .filter((match) => match.handle && match.handle.crumb)
    .map((match) => {
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
        تاريخ سير البلاغ
      </span>
    ),
  });

  let { state = {} } = useLocation();
  let { number = id } = state;
  function redirectCrumb(path) {
    console.log("🚀 ~ redirectCrumb ~ path:", path);
    return path === "/depts" ? "/managers" : path === "/" ? "/dash" : path;
  }

  let { id } = useParams();
  let { getData } = useApi();
  const {
    data: { data = [] } = {},
    isLoading,
    refetch,
  } = useQuery(["admin", ["/reports/show-action-history", ""], id], getData);
  console.log("🚀 ~ ReportDate ~ data:", data);
  console.log("🚀 ~ ReportDate ~ id:", id);
  const columns = [
    {
      title: "نوع الاجراء",
      dataIndex: "type",
      key: "id",
      // render: (text) => <a>{text}</a>,
      width: 150,
    },
    {
      title: "متخذ الاجراء",
      dataIndex: "action_taker",
      key: "action_taker",
      width: 180,
    },
    {
      title: "تاريخ الاجراء المتخذ",
      dataIndex: "date",
      key: "date",
      width: 120,
    },
    {
      title: "وقت اتخاذ الاجراء ",
      key: "time",
      dataIndex: "time",
      width: 100,
    },
    {
      title: "حالة الاجراء",
      key: "status",
      dataIndex: "status",
      width: 200,
    },
    {
      title: "تم التعيين الى ",
      key: "appointed_to",
      dataIndex: "appointed_to",
      width: 120,
    },
    // {
    //   title: " ملاحظات",
    //   key: "notes",
    //   dataIndex: "notes",
    //   width: 150,
    // },
    {
      title: "ملاحظات",
      key: "notes",
      dataIndex: "notes",
      width: 150,
      render: (text) => {
        const maxLength = 38;
        if (text && text.length > maxLength) {
          return (
            <Tooltip
              title={<p className="text-black">{text}</p>}
              placement="top"
              overlayStyle={{
                whiteSpace: "normal", // Allow text to wrap within the tooltip
                wordWrap: "break-word", // Break words when necessary
                maxWidth: "none", // Remove any max-width limitation
                width: "auto", // Allow width to auto-size based on content
                paddingInline: "16px", // Optional: Adds some padding inside
                textAlign: "left",
              }}
            >
              <span className="truncate-text">
                {text.slice(0, maxLength)}...
              </span>
            </Tooltip>
          );
        }
        return <span>{text}</span>;
      },
      onCell: () => ({
        style: {
          wordWrap: "break-word",
          whiteSpace: "normal", // Allow text to wrap
        },
      }),
    },
    {
      title: "مستجدات",
      key: "updates",
      dataIndex: "updates",
      width: 150,
    },
    {
      title: "مستندات مرفقة",
      key: "attached_documents",
      dataIndex: "attached_documents",
      width: 200,
    },
  ];
  // const data = [
  //   {
  //     key: "1",
  //     name: "John Brown",
  //     age: 32,
  //     address: "New York No. 1 Lake Park",
  //     tags: ["nice", "developer"],
  //   },
  //   {
  //     key: "2",
  //     name: "Jim Green",
  //     age: 42,
  //     address: "London No. 1 Lake Park",
  //     tags: ["loser"],
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sydney No. 1 Lake Park",
  //     tags: ["cool", "teacher"],
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sydney No. 1 Lake Park",
  //     tags: ["cool", "teacher"],
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sydney No. 1 Lake Park",
  //     tags: ["cool", "teacher"],
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sydney No. 1 Lake Park",
  //     tags: ["cool", "teacher"],
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sydney No. 1 Lake Park",
  //     tags: ["cool", "teacher"],
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sydney No. 1 Lake Park",
  //     tags: ["cool", "teacher"],
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sydney No. 1 Lake Park",
  //     tags: ["cool", "teacher"],
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sydney No. 1 Lake Park",
  //     tags: ["cool", "teacher"],
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sydney No. 1 Lake Park",
  //     tags: ["cool", "teacher"],
  //   },
  // ];
  useEffect(() => {
    refetch();
  }, [refetch]);

  let navigate = useNavigate();
  return (
    <>
      <div className="w-[90%] mx-auto mt-20">
        <div className="mb-6 flex flex-col justify-center">
          <h2 className="text-black text-xl font-bold my-1">التاسيس</h2>
          <div className="flex gap-2 items-center my-2">
            <HomeFilled className="self-center" />
            <Breadcrumb separator=">" items={breadcrumbs} />
          </div>
        </div>

        <div className="mb-10">
          <div className=" flex gap-3 mb-5">
            <div className="border border-light rounded-lg shadow-sm p-2 bg-white/50">
              <p className="font-semibold text-sm text-[#33835c] flex items-center">
                رقم البلاغ:
                <span className="text-black/65 text-xl ms-2">{number}</span>
              </p>
            </div>
          </div>
          <Table
            bordered
            columns={columns}
            loading={{
              spinning: isLoading,
              indicator: (
                <diV className=" w-full h-[650px] flex justify-center items-center">
                  <div className="loader"></div>
                </diV>
              ),
            }}
            pagination={false} // Disable pagination
            dataSource={data.map((item, index) => ({
              ...item,
              key: item.id || index,
            }))}
            tableLayout="fixed"
          />
        </div>
        <div className="mb-5 w-[100%] text-left">
          <button
            onClick={() => navigate(`/dash/${id}`)}
            className={`bg-[#33835C] !bg-transparent !text-[#33835C] border-2 border-[#33835C] font-bold p-2 rounded-md `}
          >
            {"رجوع"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ReportDate;
