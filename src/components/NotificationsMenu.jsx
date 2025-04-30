import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotificationsMenu({ open, onClose }) {
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
      className="absolute right-12 mt-2 w-64 bg-white shadow-lg rounded-md overflow-hidden z-50"
    >
      <ul>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">No new notifications</li>
      </ul>
    </div>
  );
}
