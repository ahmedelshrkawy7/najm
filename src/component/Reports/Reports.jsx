import { Button, Steps,theme } from 'antd'
import React,{useState} from 'react'

const steps = [
    {
      title: 'First',
      content: "first content",
    },
    {
      title: 'Second',
      content: "second content",
    },
    {
      title: 'Last',
      content: "last content",
    },
    {
        
    }
  ];

const Reports = () => {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
  
    const next = () => {
      setCurrent(current + 1);
    };
  
    const prev = () => {
      setCurrent(current - 1);
    };
  
    const items = steps.map((item) => ({ key: item.title, title: item.title }));
  
    const contentStyle = {
      lineHeight: '260px',
      textAlign: 'center',
      color: token.colorTextTertiary,
      backgroundColor: token.colorFillAlter,
      borderRadius: token.borderRadiusLG,
      border: `1px dashed ${token.colorBorder}`,
      marginTop: 16,
    };
  return (
    <div className='container mx-auto'>
        <h2 className='text-3xl mt-4 mb-4'>
            تقديم بلاغ 
        </h2>
        <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div className="flex justify-between" style={{ marginTop: 24 }}>
      
           <Button className='!bg-green-500 !text-white !p-4' disabled={current === 0}  onClick={() => prev()}>
             رجوع
          </Button>
          { current === items.length - 1 && <Button className='!bg-green-500 !text-white !p-4' disabled={current === 0}  onClick={() => prev()}>
             تاكيد البلاغ
          </Button>}
          { current < items.length - 1 && <Button disabled={current === steps.length - 1 } type="primary" onClick={() => next()}>
            التالى 
          </Button>  }
           
      </div>
    </div>
  )
}

export default Reports