const CardUser = ({icon , title,onClick,active}) =>{
    return <div onClick={onClick} className={`bg-white border-2 rounded-3xl transition-all   py-12 px-4 cursor-pointer ${active && "!bg-green-700 text-white"} border-gray-100`}>
      <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-green-100 ${active && "bg-white"} `}>{icon}</div>
      <h3 className={`text-black mt-3 ${active && "text-white"}`}>{title}</h3>          
    </div>
}
export default CardUser