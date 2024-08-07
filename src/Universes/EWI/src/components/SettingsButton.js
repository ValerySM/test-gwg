// src/components/SettingsButton.js
import React, { useState } from 'react';
import '../css.components/SettingsButton.css';


const SettingsButton = ({ isActive }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSettings = () => {
    setIsOpen(!isOpen);
  };
  if (isActive) return null;

  return (
    <div className="settings-button-container">
      <button className={`settings-button ${isOpen ? 'rotate' : ''}`} onClick={toggleSettings}>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="70" height="70" viewBox="0 0 120 120">
<rect width="8" height="21" x="56" y="33" fill="#9500ba"></rect><rect width="30.414" height="8" x="33" y="66" opacity=".35" transform="rotate(-27.408 46.506 70.007)"></rect><rect width="8" height="30.414" x="69.5" y="54.793" opacity=".35" transform="rotate(-62.594 73.494 69.997)"></rect><rect width="30.414" height="8" x="31.293" y="62" fill="#9500ba" transform="rotate(-27.408 46.506 66.007)"></rect><rect width="8" height="30.414" x="69.5" y="50.793" fill="#9500ba" transform="rotate(-62.594 73.494 65.997)"></rect><path d="M109,70V56l-13.371-2.971c-0.805-2.881-1.947-5.618-3.386-8.169l7.355-11.558l-9.899-9.9 L78.14,30.757c-2.551-1.438-5.288-2.58-8.168-3.384L67,14H53l-2.972,13.373c-2.88,0.805-5.617,1.946-8.168,3.384l-11.559-7.355 l-9.899,9.9l7.355,11.558c-1.439,2.551-2.581,5.289-3.386,8.169L11,56v14l13.37,2.971c0.805,2.881,1.947,5.62,3.386,8.172 l-7.354,11.556l9.899,9.899l11.555-7.353c2.552,1.439,5.291,2.582,8.173,3.387L53,112h14l2.971-13.368 c2.882-0.805,5.621-1.948,8.173-3.387l11.555,7.353l9.899-9.899l-7.354-11.556c1.439-2.552,2.581-5.29,3.386-8.172L109,70z M60,89 c-14.358,0-25.998-11.64-25.998-25.998c0-14.358,11.64-25.998,25.998-25.998s25.998,11.64,25.998,25.998 C85.998,77.36,74.358,89,60,89z" opacity=".35"></path><path fill="#d663ff" d="M109,66V52l-13.371-2.971c-0.805-2.881-1.947-5.618-3.386-8.169l7.355-11.558l-9.899-9.9 L78.14,26.757c-2.551-1.438-5.288-2.58-8.168-3.384L67,10H53l-2.972,13.373c-2.88,0.805-5.617,1.946-8.168,3.384l-11.559-7.355 l-9.899,9.9l7.355,11.558c-1.439,2.551-2.581,5.289-3.386,8.169L11,52v14l13.37,2.971c0.805,2.881,1.947,5.62,3.386,8.172 l-7.354,11.556l9.899,9.899l11.555-7.353c2.552,1.439,5.291,2.582,8.173,3.387L53,108h14l2.971-13.368 c2.882-0.805,5.621-1.948,8.173-3.387l11.555,7.353l9.899-9.899l-7.354-11.556c1.439-2.552,2.581-5.29,3.386-8.172L109,66z M60,85 c-14.358,0-25.998-11.64-25.998-25.998c0-14.358,11.64-25.998,25.998-25.998s25.998,11.64,25.998,25.998 C85.998,73.36,74.358,85,60,85z"></path><path fill="#b730e1" d="M60,28c-17.121,0-31,13.879-31,31c0,17.121,13.879,31,31,31s31-13.879,31-31 C91,41.879,77.121,28,60,28z M60,83.005c-13.256,0-24.002-10.746-24.002-24.002C35.998,45.746,46.744,35,60,35 s24.002,10.746,24.002,24.002C84.002,72.258,73.256,83.005,60,83.005z"></path><circle cx="60" cy="63" r="12" opacity=".35"></circle><circle cx="60" cy="59" r="12" fill="#d663ff"></circle>
</svg>
      </button>
      <div className={`settings-menu ${isOpen ? 'open' : ''}`}>
        <p>Option 1</p>
        <p>Option 2</p>
        <p>Option 3</p>
      </div>
    </div>
  );
};

export default SettingsButton;
