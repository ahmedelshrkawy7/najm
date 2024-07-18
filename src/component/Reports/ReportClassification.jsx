import {CardUser} from '../../import'

const CARDS= [
    {
        icon:<i class="fa fa-bandcamp text-green-500 text-2xl" aria-hidden="true"></i>,
        title:'احتيال او فساد او رشوة او اخنلاس او تزوير'
    },
    {
        icon:<i class="fa fa-bandcamp text-green-500 text-2xl" aria-hidden="true"></i>,
        title:'غسل اموال او تمويل ارهاب '
    },
    {
        icon:<i class="fa fa-bandcamp text-green-500 text-2xl" aria-hidden="true"></i>,
        title:'مخالفة للانظمة والتعليمات'
    },
    {
        icon:<i class="fa fa-bandcamp text-green-500 text-2xl" aria-hidden="true"></i>,
        title:'مخالفة لسياسة واجراءات الشركة'
    },
    {
        icon:<i class="fa fa-bandcamp text-green-500 text-2xl" aria-hidden="true"></i>,
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