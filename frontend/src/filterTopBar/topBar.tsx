import { Link } from 'react-router-dom';
import './topBar.css'
import { RxCross2 } from 'react-icons/rx';

export function TopBar({name,isCreateImg}: {name: string,isCreateImg: boolean}) {
  return (
    <div className="topbarMain">
      {isCreateImg && (<Link to={'/'} className='homPage-link'><RxCross2 size={24}/></Link>)}
      <div className=' middle-text'>{name}</div>
    </div>
  );
}