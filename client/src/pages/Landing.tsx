import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

const landing = () => {
    const navigate = useNavigate();
    const handleStart = () => {
        navigate('/login');
    }

  return (
    <div>
        <Button onClick={handleStart}>Button</Button>
    </div>
  )
}

export default landing