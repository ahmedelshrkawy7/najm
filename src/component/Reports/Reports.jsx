import {Steps,useState,ReportClassification,theme,ReportsPreview} from "../../import"

const Reports = () => {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [selectedCard,setSelectedCard]= useState("");
    const  handleSelceted =(id)=>{
        setSelectedCard(id)
    }
    const steps = [
      {
        title: 'تصنيف البلاغ',
        content: <ReportClassification  selectedCard={selectedCard} handleSelceted={handleSelceted} />,
      },
      {
        title: 'تفاصيل البلاغ',
        content: "second content",
      },
      {
        title: 'معلومات الاتصال',
        content: "last content",
      },
      {
          title:"معاينة البلاغ",
          content: <ReportsPreview selectedCard={selectedCard}/>,
      }
    ];
    
    const next = () => {
      setCurrent(current + 1);
    };
  
    const prev = () => {
      setCurrent(current - 1);
    };
  
    const items = steps.map((item) => ({ key: item.title, title: item.title }));
  
    const contentStyle = {
      backgroundColor: "white",
      borderRadius: 12,
      overflow:"hidden",
      border: `1px solid ${token.colorBorder}`,
      marginTop: 50,
    };
    // bg-[linear-gradient(to_right,rgba(0,128,2,0),rgba(0,128,2,1))]
  return (
    <div className='main_container mx-auto'>
        <h2 className='text-3xl w-fit my-12 relative after:absolute after:content-[""] after:top-12 after:right-0 after:w-full after:h-[2px] after:block after:bg-gradient-to-l after:from-green-700 after:to-green-100'>
            تقديم بلاغ 
        </h2> 
        <Steps  current={current} items={items}  />
      <div style={contentStyle}>
        <h2 className="bg-green-700 text-xl px-8 py-4 text-white">تصنيف البلاغ</h2>
        {steps[current].content}
        </div>
      <div className="flex justify-between mt-6" >
           <button on className=' bg-white border border-green-700 text-green-700  flex gap-2  p-3 rounded-md'   onClick={prev}>
           <span>&rarr;</span>
            <span>رجوع</span>
          </button>
          { current === items.length - 1 && <button className='bg-green-700 rounded-md text-white p-3'>
             تاكيد البلاغ
          </button>}
          { current < items.length - 1 && <button className=' bg-green-700 text-white  rounded-md disabled:bg-green-100 p-3'  onClick={next}>
            <span>التالى </span>
            <span>&larr;</span>
          </button>  }
           
      </div>
    </div>
  )
}

export default Reports