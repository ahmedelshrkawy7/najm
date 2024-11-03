/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ReportEscalation from "../models/ReportEscalation";
import ReportInfo from "../models/ReportInfo";
import ReportLock from "../models/ReportLock";
import StudyContext from "../store/StudyContext";
import ReportModal from "../models/ReportModal";
import ReportAssign from "../models/ReportAssign";
import SuccessModal from "../models/successModal";
import { errorNotf, successNotf } from "../utils/notifications/Toast";
import { useMutation } from "react-query";
import useApi from "../utils/useApi";

const ReportMenu = ({
  setShowMenu,
  func,
  showModal,
  setShowSvg,
  status,
  refetch,
}) => {
  const navigate = useNavigate();
  const { handleHideMenu } = useContext(StudyContext);

  let role = JSON.parse(localStorage.getItem("token"))?.role;
  const { postData } = useApi();
  const { id } = useParams();
  const mutation = useMutation(postData, {
    onSuccess: () => {
      // change(3);
      successNotf(
        role === "responsible"
          ? "تم تاكيد الاشعار من المسئول بنجاح"
          : "تم اعتماد الدراسة الاولية بنجاح"
      );
      refetch();
      // ref.current.close();
      setShowSvg(false);
    },
    onError: (err) => {
      errorNotf(err.response.data.message);
      // ref.current.close();
      setShowSvg(false);
    },
  });

  let optionItems;

  if (role === "responsible") {
    optionItems = [
      {
        id: 1,
        title: "استلام البلاغ",
        children: (
          <ReportModal
            title="استلام البلاغ"
            setShowSvg={setShowSvg}
            refetch={refetch}
          ></ReportModal>
        ),
        disabled:
          status === "accepted" ||
          status === "under_confirm" ||
          status === "prepare_initial_study" ||
          status === "under_process" ||
          status === "confirmed" ||
          status === "resubmit_study_from_accreditor" ||
          status === "assign_to_study" ||
          status === "request_updates_from_department" ||
          status === "request_updates_from_responsible" ||
          status === "add_notes_from_department" ||
          status === "add_updates_from_department" ||
          status === "closed" ||
          status === "request_information_from_responsible" ||
          status === "final_result_from_department" ||
          status === "final_result_from_responsible" ||
          status === "add_information_from_department" ||
          status === "add_updates_from_responsible" ||
          status === "add_information_from_responsible" ||
          status === "add_notes_from_responsible",
      },
      {
        id: 2,
        title: "اعداد دراسة اولية",
        path: "preparingStudy",
        disabled:
          status === "new" ||
          status === "under_confirm" ||
          status === "prepare_initial_study" ||
          status === "under_process" ||
          status === "confirmed" ||
          status === "assign_to_study" ||
          status === "request_updates_from_department" ||
          status === "request_updates_from_responsible" ||
          status === "add_notes_from_department" ||
          status === "add_updates_from_department" ||
          status === "closed" ||
          status === "request_information_from_responsible" ||
          status === "final_result_from_department" ||
          status === "final_result_from_responsible" ||
          status === "add_information_from_department" ||
          status === "add_updates_from_responsible" ||
          status === "add_information_from_responsible" ||
          status === "add_notes_from_responsible",
      },
      {
        id: 3,
        title: "توجيه الدراسة الاولية للاعتماد",
        path: "previewStudy",
        disabled:
          status === "new" ||
          status === "under_confirm" ||
          status === "under_process" ||
          status === "accepted" ||
          status === "confirmed" ||
          status === "assign_to_study" ||
          status === "request_updates_from_department" ||
          status === "request_updates_from_responsible" ||
          status === "add_notes_from_department" ||
          status === "add_updates_from_department" ||
          status === "closed" ||
          status === "request_information_from_responsible" ||
          status === "final_result_from_department" ||
          status === "final_result_from_responsible" ||
          status === "add_information_from_department" ||
          status === "add_updates_from_responsible" ||
          status === "add_information_from_responsible" ||
          status === "add_notes_from_responsible",
      },
      {
        id: 4,
        title: "التعديل على الدراسة الاولية",
        path: "editStudy",
        disabled:
          status === "new" ||
          status === "under_confirm" ||
          status === "accepted" ||
          status === "confirmed" ||
          status === "assign_to_study" ||
          status === "request_updates_from_department" ||
          status === "request_updates_from_responsible" ||
          status === "add_notes_from_department" ||
          status === "add_updates_from_department" ||
          status === "closed" ||
          status === "request_information_from_responsible" ||
          status === "final_result_from_department" ||
          status === "final_result_from_responsible" ||
          status === "add_information_from_department" ||
          status === "add_updates_from_responsible" ||
          status === "add_information_from_responsible" ||
          status === "add_notes_from_responsible",
      },
      {
        id: 5,
        title: "اسناد البلاغ",
        disabled:
          status === "new" ||
          status === "assign_to_study" ||
          status === "request_updates_from_department" ||
          status === "request_updates_from_responsible" ||
          status === "add_notes_from_department" ||
          status === "add_updates_from_department" ||
          status === "closed" ||
          status === "request_information_from_responsible" ||
          status === "final_result_from_department" ||
          status === "final_result_from_responsible" ||
          status === "add_information_from_department" ||
          status === "add_updates_from_responsible" ||
          status === "add_information_from_responsible" ||
          status === "add_notes_from_responsible",
        children: (
          <ReportModal
            title="اسناد البلاغ"
            setShowSvg={setShowSvg}
            refetch={refetch}
          >
            <ReportAssign />
          </ReportModal>
        ),
      },
      {
        id: 6,
        title: "طلب مستجدات",
        children: (
          <ReportModal
            title="طلب مستجدات"
            setShowSvg={setShowSvg}
            refetch={refetch}
          >
            <ReportInfo
              title="طلب مستجدات"
              action={"request_updates"}
              successMsg={"تم طلب مستجدات بنجاح"}
            />
          </ReportModal>
        ),
        disabled:
          status === "accepted" ||
          status === "new" ||
          status === "closed" ||
          status === "final_result_from_responsible",
      },
      {
        id: 7,
        title: "اضافة مستجدات",
        children: (
          <ReportModal
            title="اضافة مستجدات"
            setShowSvg={setShowSvg}
            refetch={refetch}
          >
            <ReportInfo
              title="إضافه مستجدات"
              action="add_updates"
              successMsg={"تم اضافة مستجدات بنجاح"}
            />
          </ReportModal>
        ),
        disabled:
          status === "accepted" ||
          status === "new" ||
          status === "closed" ||
          status === "final_result_from_responsible",
      },
      {
        id: 9,
        title: "طلب معلومات",
        children: (
          <ReportModal
            title="طلب معلومات"
            setShowSvg={setShowSvg}
            refetch={refetch}
          >
            <ReportInfo
              title="طلب معلومات"
              action="request_information"
              successMsg={"تم طلب معلومات بنجاح"}
            />
          </ReportModal>
        ),
        disabled:
          status === "accepted" ||
          status === "new" ||
          status === "closed" ||
          status === "final_result_from_responsible",
      },
      {
        id: 10,
        title: "اضافة معلومات",
        children: (
          <ReportModal
            title="اضافة معلومات"
            setShowSvg={setShowSvg}
            refetch={refetch}
          >
            <ReportInfo
              title="اضافة معلومات"
              action="add_information"
              successMsg={"تم اضافة معلومات بنجاح"}
            />
          </ReportModal>
        ),
        disabled:
          status === "accepted" ||
          status === "new" ||
          status === "closed" ||
          status === "final_result_from_responsible",
      },
      {
        id: 11,
        title: "اضافة ملاحظات",
        children: (
          <ReportModal
            title="اضافة ملاحظات"
            setShowSvg={setShowSvg}
            refetch={refetch}
          >
            <ReportInfo
              title="اضافة ملاحظات"
              action={"add_notes"}
              successMsg={"تم اضافة ملاحظات بنجاح"}
            />
          </ReportModal>
        ),
        disabled:
          status === "accepted" ||
          status === "new" ||
          status === "closed" ||
          status === "final_result_from_department" ||
          status === "final_result_from_responsible" ||
          status === "add_information_from_department",
      },
      {
        id: 12,
        title: "اقفال البلاغ",
        children: (
          <ReportModal
            title="اتخاذ اجراء"
            setShowSvg={setShowSvg}
            refetch={refetch}
          >
            <ReportLock setShowSvg={setShowSvg} />
          </ReportModal>
        ),
        disabled:
          status === "accepted" ||
          status === "new" ||
          status === "closed" ||
          status === "request_information_from_responsible" ||
          status === "add_notes_from_department" ||
          status === "final_result_from_department" ||
          status === "add_updates_from_responsible" ||
          status === "add_information_from_responsible" ||
          status === "request_updates_from_responsible" ||
          status === "add_notes_from_responsible" ||
          status === "assign_to_study",
      },
      {
        id: 13,
        title: "تصعيد البلاغ",
        children: (
          <ReportModal setShowSvg={setShowSvg}>
            <ReportEscalation />
          </ReportModal>
        ),
        disabled:
          status === "accepted" ||
          status === "new" ||
          status === "closed" ||
          status === "final_result_from_department" ||
          status === "final_result_from_responsible",
      },
      {
        id: 14,
        title: "تأكيد إشعار",
        children: (
          <ReportModal
            title={"تأكيد إشعار"}
            setShowSvg={setShowSvg}
            refetch={refetch}
          >
            <SuccessModal
              title={" تأكيد إشعار النتيجة النهائية"}
              close={"تأكيد"}
              confirm={() => {
                mutation.mutate([
                  `/reports/${id}`,
                  {
                    action: "confirm_the_final_result",
                    _method: "PUT",
                  },
                ]);
              }}
            />
          </ReportModal>
        ),
        disabled:
          status === "accepted" ||
          status === "new" ||
          status === "closed" ||
          status === "request_information_from_responsible" ||
          status === "add_notes_from_department" ||
          status === "final_result_from_responsible" ||
          status === "add_information_from_department" ||
          status === "add_updates_from_responsible" ||
          status === "add_information_from_responsible" ||
          status === "request_updates_from_responsible" ||
          status === "add_notes_from_responsible" ||
          status === "add_notes_from_responsible" ||
          status === "assign_to_study",
      },
    ];
  } else {
    optionItems = [
      {
        id: 9,
        title: "طلب معلومات",
        children: (
          <ReportModal
            title="طلب معلومات"
            setShowSvg={setShowSvg}
            action="request_information"
            refetch={refetch}
          >
            <ReportInfo
              title="طلب معلومات"
              action="request_information"
              successMsg={"تم طلب معلومات بنجاح"}
            />
          </ReportModal>
        ),
        disabled: status === "closed" || false,
      },
      {
        id: 10,
        title: "اضافة معلومات",
        children: (
          <ReportModal
            title="اضافة معلومات"
            setShowSvg={setShowSvg}
            refetch={refetch}
          >
            <ReportInfo
              title="إضافه معلومات"
              action="add_information"
              successMsg={"تم اضافة معلومات بنجاح"}
            />
          </ReportModal>
        ),
        disabled: status === "closed" || false,
      },
      {
        id: 11,
        title: "اضافة ملاحظات",
        children: (
          <ReportModal
            title="اضافة ملاحظات"
            setShowSvg={setShowSvg}
            refetch={refetch}
          >
            <ReportInfo
              title="اضافة ملاحظات"
              action={"add_notes"}
              successMsg={"تم اضافة ملاحظات بنجاح"}
            />
          </ReportModal>
        ),
        disabled: status === "closed" || false,
      },
      {
        id: 12,
        title: "طلب مستجدات",
        children: (
          <ReportModal
            title="طلب مستجدات"
            setShowSvg={setShowSvg}
            refetch={refetch}
          >
            <ReportInfo
              action={"request_updates"}
              title="طلب مستجدات"
              successMsg={"تم طلب مستجدات بنجاح"}
            />
          </ReportModal>
        ),
        disabled: status === "closed" || false,
      },
      {
        id: 13,
        title: "اضافة مستجدات",
        children: (
          <ReportModal
            title="اضافة مستجدات"
            setShowSvg={setShowSvg}
            refetch={refetch}
          >
            <ReportInfo
              action={"add_updates"}
              title="اضافة مستجدات"
              successMsg={"تم اضافة مستجدات بنجاح"}
            />
          </ReportModal>
        ),
        disabled: status === "closed" || false,
      },
      {
        id: 14,
        title: " إشعار بالنتيجه النهائية",
        children: (
          <ReportModal
            title=" إشعار بالنتيجه النهائية"
            setShowSvg={setShowSvg}
            refetch={refetch}
          >
            <ReportInfo
              title=" إشعار بالنتيجه النهائية"
              action={"notify_the_final_result"}
              successMsg={"تم ارسال النتيجة النهائية الى المسئول بنجاح"}
              setShowSvg={setShowSvg}
            />
          </ReportModal>
        ),
        disabled:
          status === "final_result_from_department" ||
          status === "closed" ||
          false,
      },
    ];
  }

  const isOptionDisabled = (opt) => {
    if (role === "responsible") {
      return (
        status === "rejected" ||
        status === "rejected_from_responsible" ||
        (status === "new" && opt.id !== 1) ||
        ((status === "request_updates_from_department" ||
          status === "request_updates_from_responsible" ||
          status === "add_notes_from_department" ||
          status === "add_updates_from_department") &&
          (opt.id === 1 ||
            opt.id === 2 ||
            opt.id === 3 ||
            opt.id === 4 ||
            opt.id === 5)) ||
        ((status === "request_information_from_responsible" ||
          status === "add_notes_from_department" ||
          status === "add_information_from_department" ||
          status === "add_notes_from_responsible") &&
          (opt.id === 1 ||
            opt.id === 2 ||
            opt.id === 3 ||
            opt.id === 4 ||
            opt.id === 5 ||
            opt.id === 14 ||
            opt.id === 12)) ||
        (status === "closed" && opt.id) ||
        ((status === "add_updates_from_responsible" ||
          status === "add_information_from_responsible" ||
          status === "request_updates_from_responsible") &&
          (opt.id === 1 ||
            opt.id === 2 ||
            opt.id === 3 ||
            opt.id === 4 ||
            opt.id === 5 ||
            opt.id === 12 ||
            opt.id === 14)) ||
        (status === "final_result_from_responsible" && opt.id !== 12) ||
        (status === "accepted" && opt.id !== 2) ||
        (status === "resubmit_study_from_accreditor" && opt.id === 1) ||
        (status === "under_process" &&
          (opt.id === 1 || opt.id === 2 || opt.id === 3)) ||
        (status === "prepare_initial_study" &&
          (opt.id === 1 || opt.id === 2)) ||
        ((status === "under_confirm" || status === "confirmed") &&
          (opt.id === 1 || opt.id === 2 || opt.id === 3 || opt.id === 4)) ||
        (status === "final_result_from_department" &&
          (opt.id === 1 ||
            opt.id === 2 ||
            opt.id === 3 ||
            opt.id === 4 ||
            opt.id === 5 ||
            opt.id === 12)) ||
        (status === "assign_to_study" &&
          (opt.id === 1 ||
            opt.id === 2 ||
            opt.id === 3 ||
            opt.id === 4 ||
            opt.id === 5 ||
            opt.id === 12 ||
            opt.id === 14))
      );
    } else {
      return (status === "closed" && opt.disabled === true) ||
        (status === "final_result_from_department" && opt.id === 14)
        ? "text-gray-400 !cursor-not-allowed"
        : "cursor-pointer";
    }
  };

  const clickModal = (children) => {
    func(children);
  };
  const navigateTo = (path, state) => {
    handleHideMenu();
    navigate(path, state);
  };

  console.log(status);
  return (
    <ul className="h-full">
      {optionItems.map((opt) => (
        <li
          onClick={() => {
            if (opt.disabled) return;
            if (
              status === "rejected" ||
              status === "rejected_from_responsible"
            ) {
              opt.disabled = true;
              return;
            }
            setShowSvg(true);
            !!opt?.path
              ? navigateTo(opt.path, {
                  state: { index: opt.id, closeModal: true },
                })
              : clickModal(opt.children);
          }}
          className={`py-[5px] px-[10px] border border-gray-100 text-[16px] ${
            // role === "responsible" &&
            // (status === "rejected" ||
            //   status === "rejected_from_responsible" ||
            //   (status === "new" && opt.id !== 1) ||
            //   ((status === "request_updates_from_department" ||
            //     status === "request_updates_from_responsible" ||
            //     status === "add_notes_from_department" ||
            //     status === "add_updates_from_department") &&
            //     (opt.id === 1 ||
            //       opt.id === 2 ||
            //       opt.id === 3 ||
            //       opt.id === 4 ||
            //       opt.id === 5)) ||
            //   ((status === "request_information_from_responsible" ||
            //     status === "add_notes_from_department" ||
            //     status === "add_information_from_department" ||
            //     status === "add_notes_from_responsible") &&
            //     (opt.id === 1 ||
            //       opt.id === 2 ||
            //       opt.id === 3 ||
            //       opt.id === 4 ||
            //       opt.id === 5 ||
            //       opt.id === 14 ||
            //       opt.id === 12)) ||
            //   (status === "closed" && opt.id) ||
            //   ((status === "add_updates_from_responsible" ||
            //     status === "add_information_from_responsible" ||
            //     status === "request_updates_from_responsible") &&
            //     (opt.id === 1 ||
            //       opt.id === 2 ||
            //       opt.id === 3 ||
            //       opt.id === 4 ||
            //       opt.id === 5 ||
            //       opt.id === 12 ||
            //       opt.id === 14)) ||
            //   (status === "final_result_from_responsible" && opt.id !== 12) ||
            //   (status === "accepted" && opt.id !== 2) ||
            //   (status === "resubmit_study_from_accreditor" && opt.id === 1) ||
            //   (status === "under_process" &&
            //     (opt.id === 1 || opt.id === 2 || opt.id === 3)) ||
            //   (status === "prepare_initial_study" &&
            //     (opt.id === 1 || opt.id === 2)) ||
            //   ((status === "under_confirm" || status === "confirmed") &&
            //     (opt.id === 1 ||
            //       opt.id === 2 ||
            //       opt.id === 3 ||
            //       opt.id === 4)) ||
            //   (status === "final_result_from_department" &&
            //     (opt.id === 1 ||
            //       opt.id === 2 ||
            //       opt.id === 3 ||
            //       opt.id === 4 ||
            //       opt.id === 5 ||
            //       opt.id === 12)) ||
            //   (status === "assign_to_study" &&
            //     (opt.id === 1 ||
            //       opt.id === 2 ||
            //       opt.id === 3 ||
            //       opt.id === 4 ||
            //       opt.id === 5 ||
            //       opt.id === 12 ||
            //       opt.id === 14)))
            isOptionDisabled(opt)
              ? "text-gray-400 cursor-not-allowed"
              : "cursor-pointer"
          } `}
          key={opt.id}
        >
          {opt.title}
        </li>
      ))}
    </ul>
  );
};

export default ReportMenu;
