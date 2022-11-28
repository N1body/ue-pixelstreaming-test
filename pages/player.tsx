import styled from "styled-components";

const PlayerBox = styled.div`
#player {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 24px;
  letter-spacing: 1px;
  position: relative;
}

.wrapper {
  position: absolute;
  z-index: 99;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
}

#videoPlayOverlay {
  z-index: 30;
  position: absolute;
  color: var(--colour4);
  font-size: 1.8em;
  font-family: var(--inputFont);
  width: 100%;
  height: 100%;
}

.hiddenState {
  display: none;
}

/* State for element to be clickable */
.clickableState {
  align-items: center;
  justify-content: center;
  display: flex;
  cursor: pointer;
}

 #streamingVideo {
  width: 100%;
  height: 100%;
}
`
export default function Player() {
  return (
    <PlayerBox>
      <div id="player" className="fixed-size">
      </div>
    </PlayerBox>
  )
}