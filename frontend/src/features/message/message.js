import { Alert } from "@material-tailwind/react";
 
export function AlertColors({color,message}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <Alert color={color}>{message}</Alert>
      
    </div>
  );
}