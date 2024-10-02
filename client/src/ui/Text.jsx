import styled from "styled-components";
import { HiMiniCalendarDays } from "react-icons/hi2";
import { HiOutlineClock } from "react-icons/hi2";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { HiMiniPhoneArrowDownLeft } from "react-icons/hi2";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import { HiOutlineEnvelopeOpen } from "react-icons/hi2";
const DivText = styled.div`
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
const TextP = styled.p`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
function Text() {
  return (
    <DivText>
      <TextP>
        <HiMiniCalendarDays />
        sunday to friday
      </TextP>
      <TextP>
        <HiOutlineClock />
        8:00 am to 6:00pm
      </TextP>
      <TextP>
        <HiOutlineHomeModern />
        dubai,nakheel jumeirah{" "}
      </TextP>
      <TextP>
        <HiDevicePhoneMobile />
        45678345
      </TextP>
      <TextP>
        <HiMiniPhoneArrowDownLeft />
        78493223
      </TextP>
      <TextP>
        <HiOutlineEnvelopeOpen />
        rami.sultana@gmail.com
      </TextP>
      {/* <p>owner rami sultana</p> */}
    </DivText>
  );
}

export default Text;
