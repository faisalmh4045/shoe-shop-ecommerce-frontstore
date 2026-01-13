import { useSelector } from "react-redux";
import { selectUser } from "@/store/authSlice";

const ProfileTab = () => {
  const user = useSelector(selectUser);

  return <h1>{user?.user_metadata?.full_name}</h1>;
};

export default ProfileTab;
