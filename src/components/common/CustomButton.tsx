import type { FC, ReactNode } from "react";
import { Button as MuiButton, CircularProgress } from "@mui/material";
import type { ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  label?: string;
  loading?: boolean;
  children?: ReactNode;

}

const CustomButton: FC<CustomButtonProps> = ({
  label,
  loading = false,
  disabled,
  children,
  sx,
  variant = "contained",
  ...rest
}) => {
  const content = label || children || "Submit";

  return (
    <MuiButton
      variant={variant}
      disabled={disabled || loading}
      {...rest}
      sx={{
        textTransform: "none",
        borderRadius: "10px",
        py: 1.5,
        fontWeight: 600,
        minHeight: "48px",
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        },
        ...sx,
      }}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : content}
    </MuiButton>
  );
};

export default CustomButton;
