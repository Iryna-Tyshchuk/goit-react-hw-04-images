import { ThreeDots } from 'react-loader-spinner';
import { StyledOverlay } from 'components/Modal/Modal.styled';

export const Loader = () => {
  return (
    <StyledOverlay>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#3f51b5"
        ariaLabel="three-dots-loading"
        visible={true}
        wrapperStyle={{}}
        wrapperClass="three-dots-wrapper"
      />
    </StyledOverlay>
  );
};
