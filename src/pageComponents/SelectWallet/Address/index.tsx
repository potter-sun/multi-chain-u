import React from 'react';
import CommonAddress from 'components/CommonAddress';
import LogoutButton from 'pageComponents/LogoutButton';

export default function Address() {
  return (
    <>
      {[
        {
          label: 'MainChain AELF',
          value: 'ELF_2DKgy7GafbrYWGnhSC3iSYgM9ZfudYS2KLLr1rDPLF9nZfWA6G_AELF',
        },
        {
          label: 'SideChain tDVV',
          value: 'ELF_2DKgy7GafbrYWGnhSC3iSYgM9ZfudYS2KLLr1rDPLF9nZfWA6G_AELF',
        },
      ].map((item) => (
        <div key={item.label}>
          <CommonAddress label={item.label} value={item.value} />
        </div>
      ))}
      <LogoutButton />
    </>
  );
}
