import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotificationsMenu = ({ open, onClose }) => {
  const ref = useRef();

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 w-80 bg-white shadow-lg rounded-md overflow-hidden z-50"
    >
      <div className="px-4 py-2 border-b">
        <h3 className="text-lg font-semibold">Notifications</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        <div className="px-4 py-2 hover:bg-gray-100">
          <p className="text-sm">No new notifications</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationsMenu;
