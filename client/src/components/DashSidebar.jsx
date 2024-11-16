import { Sidebar } from 'flowbite-react';
import { HiUser, HiArrowSmRight } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function DashSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab')?.toLowerCase();
    if (tabFromUrl && ['profile'].includes(tabFromUrl)) {
      setTab(tabFromUrl);
    } else {
      setTab('');
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.message || 'Sign out failed!');
      } else {
        dispatch(signoutSuccess());
        navigate('/sign-in'); // Redirect after signout
      }
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred!');
    }
  };

  return (
     <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            to="/dashboard?tab=profile"
            active={tab === 'profile'}
            icon={HiUser}
            label={'User'}
            labelColor="dark"
          >
            Profile
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}


