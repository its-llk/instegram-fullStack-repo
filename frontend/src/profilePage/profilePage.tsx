import '../homePage/homePage.css'
import { Navbar } from '../navbars/buttom-navbar/navbar'
import { TopBar } from '../navbars/top-navbar/topBar'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'
import { currentUserAtom } from '../api/globals'
import { getProfileInfo } from '../api/userAPI'
import { PostDiv } from '../postComponents/PostDiv'
import { useQuery } from '@tanstack/react-query'


export function ProfilePage() {
const { userId, "*": profileUrl } = useParams<{ userId: string; "*": string }>()
const [currentUser] = useAtom(currentUserAtom)

const {data: userProfilePosts,isLoading} = useQuery({
     queryFn: () => getProfileInfo(userId!,currentUser),
     queryKey: ['getProfileUser'],
  })
  

  return (
    <>
    <TopBar name= {`${userId}`} isCreateImg={false} />
        <div className='profile-header'>
           <img src={profileUrl} alt={userId} className='image-header-profile' />
           <strong>{userId}</strong>
        </div>
    {!isLoading && <PostDiv posts={userProfilePosts}/>}
    {isLoading && 
    <div>
      is still loading...
    </div>
    }

    <Navbar/>
    </>
  )
}
