import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";

interface ConfirmationDialogProps {
  title: string;
  children?: React.ReactNode;
  hideDefaultActions?: boolean;
  extraActions?: React.ReactNode;
  description?: string;
  open: boolean;
  primaryActionText?: string;
  secondaryActionText?: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = (props) => {
  const {
    title,
    children,
    hideDefaultActions,
    extraActions,
    description,
    open,
    primaryActionText,
    secondaryActionText,
    onClose,
    onConfirm,
  } = props;

  return (
    <div>
      <Dialog
        open={open}
        sx={{
          zIndex: 5000,
        }}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          data-cy="confirmation-dialog-title"
        >
          {title}
        </DialogTitle>
        <DialogContent sx={{ overflowWrap: "break-word" }}>
          {description && (
            <DialogContentText
              id="alert-dialog-description"
              data-cy="confirmation-dialog-description"
              color="textPrimary"
            >
              {description}
            </DialogContentText>
          )}
          {children}
        </DialogContent>
        <DialogActions>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {extraActions}
            {!hideDefaultActions && (
              <React.Fragment>
                <Button
                  onClick={onClose}
                  data-cy="confirmation-dialog-cancel-button"
                >
                  {secondaryActionText}
                </Button>
                <Button
                  sx={{ color: "white", borderRadius: "2px" }}
                  variant="contained"
                  data-cy="confirmation-dialog-confirm-button"
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  autoFocus
                >
                  {primaryActionText}
                </Button>
              </React.Fragment>
            )}
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ConfirmationDialog;
