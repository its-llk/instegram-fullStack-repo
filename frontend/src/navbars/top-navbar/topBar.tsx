import { Link } from 'react-router-dom';
import './topBar.css'
import { RxCross2 } from 'react-icons/rx';

interface TopBarProps {
  name: string;
  isCreateImg: boolean;
}

export function TopBar(props: TopBarProps) {
  return (
    <div className="topbarMain">
      {props.isCreateImg && (<Link to={'/'} className='homPage-link'><RxCross2 size={24}/></Link>)}
      <div className=' middle-text'>{props.name}</div>
    </div>
  );
}