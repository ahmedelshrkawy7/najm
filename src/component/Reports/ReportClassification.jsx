import {CardUser} from '../../import'

const CARDS= [
    {
        icon:<img src='../src/assets/icons/money-3.svg'/>,
        title:'احتيال او فساد او رشوة او اخنلاس او تزوير'
    },
    {
        icon:<img src='../src/assets/icons/coin.png'/>,
        title:'غسل اموال او تمويل ارهاب '
    },
    {
        icon:<img src='../src/assets/icons/receipt-item.png'/>,
        title:'مخالفة للانظمة والتعليمات'
    },
    {
        icon:<img src='../src/assets/icons/receipt.png'/>,
        title:'مخالفة لسياسة واجراءات الشركة'
    },
    {
        icon:<img src='../src/assets/icons/Vector.svg'/>,
        title:'مخالفة لمدونة قواعد السلوك'
    },
]
const ReportClassification = ({handleSelceted,selectedCard}) => {
  return (
    <div className='p-8'>
        <h2 className='text-black'>يرجى تحديد احدى الخيارات الاتية</h2>
    <div className='grid mt-4 gap-4 sm:gap-8 md:gap-12 grid-col-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {CARDS.map((card)=><CardUser 
        onClick={()=>handleSelceted(card.title)} 
        active={selectedCard === card.title}  
        title={card.title} icon={card.icon}  />)}
    </div>
    </div>
  )
}

export default ReportClassification