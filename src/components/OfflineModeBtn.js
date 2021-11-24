import { useState, useEffect } from "react";

const OfflineButton = ({ callbackOffline }) => {
const [offlineData, setOfflineData ] = useState(false)

  const handleCheck = () => {
      if(offlineData) {
        setOfflineData(false)
      } else {
        setOfflineData(true)
      }
  };

  useEffect(() => {
    callbackOffline(offlineData);
  }, [offlineData]);

  return (
    <div>
        <input onClick={handleCheck} type="checkbox" id="offlineMode" name="offlineMode" />
        <label for="offlineMode">Offline</label>
    </div>
  );
};

export default OfflineButton;