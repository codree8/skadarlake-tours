// ParentComponent.js
import { useState } from "react";
import CreateItemDrawer from "./create-drawer";

function ParentComponent() {
  const [updateStatus, setUpdateStatus] = useState(false);

  const handleUpdate = () => {
    setUpdateStatus(true);
    
  };

  return (
    <div>
      <CreateItemDrawer dataType="tours" onUpdate={handleUpdate} />
      {}
    </div>
  );
}

export default ParentComponent;
