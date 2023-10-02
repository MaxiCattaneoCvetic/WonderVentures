/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'
import style from './profileDetails.module.css'
import { user } from '../../features/user/Login/authSlice'
import { BsXLg } from 'react-icons/bs'

const ProfileDetails = ({setIsMiPerfilOpen}) => {
    const userdata = JSON.parse(useSelector(user))
    return (
        <>
            <div className={style["blur-background"]} />
            <div className={style["profile-details-container"]} >
                <BsXLg className={style['icon-prof-details']} onClick={() => setIsMiPerfilOpen(false)}/>
                <div>
                    <h5>Nombre y Apellido</h5>
                    <p>{userdata.userName} {userdata.userLastName}</p>
                </div>
                <div>
                    <h5>Email</h5>
                    <p>{userdata.userEmail}</p>
                </div>
            </div>
        </>
    )
}

export default ProfileDetails