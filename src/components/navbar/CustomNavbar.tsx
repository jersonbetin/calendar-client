'use client';
import useLogout from '@/hooks/auth/useLogout';
import { PUBLIC_URL } from '@/utils/constants';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Listbox,
  ListboxItem,
} from '@nextui-org/react';

const CustomNavbar = () => {

  const { logout } = useLogout();
  
  const RenderAvatarDropdown = () => {
    return (
      <Dropdown placement="left-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform flex-shrink-0"
            src={`${PUBLIC_URL}/avatar1.png`}
            size="sm"
            color="secondary"
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          disabledKeys={['profile']}
          color="secondary"
        >
          <DropdownSection aria-label="Profile & Actions" showDivider>
            <DropdownItem
              isReadOnly
              key="profile"
              className="h-14 gap-2 opacity-100"
            >
              correo
            </DropdownItem>
          </DropdownSection>

          <DropdownSection aria-label="logout sextion">
            <DropdownItem
              key="logout"
              startContent={<FontAwesomeIcon icon={faRightFromBracket} />}
              onClick={() => {
                logout();
              }}
            >
              Salir
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    );
  };

  return (
    <div className="w-full max-w-[70px] border-small px-1 py-2 border-default-200 dark:border-default-100">
      <Listbox
        aria-label="Listbox Variants"
        color={'secondary'}
        variant="bordered"
        disabledKeys={['new']}
        classNames={{ base: 'h-full', list: 'justify-between h-full' }}
        itemClasses={{ base: 'h-[50px] px-0', wrapper: 'text-red' }}
      >
        <ListboxItem
          key="new"
          className="text-center text-white bg-secondary-500"
        >
          <FontAwesomeIcon icon={faCalendar} />
        </ListboxItem>
        <ListboxItem key="avatar" className='data-[hover=true]:border-none'>
          <div className="flex justify-center items-center w-full h-[50px]">
            <RenderAvatarDropdown />
          </div>
        </ListboxItem>
      </Listbox>
    </div>
  );
};

export default CustomNavbar;
