import React from 'react'
import BiLogOut from 'react-icons'

const LogoutButton = () => {
    return (
		<div className='mt-auto'>
			{!loading ? (
				<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={BiLogOut} />
			) : (
				<span className='loading loading-spinner'></span>
			)}
		</div>
	);
};

export default LogoutButton;