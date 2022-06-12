
import { styled } from '@mui/system';
import BadgeUnstyled from '@mui/base/BadgeUnstyled';

const StyledBadge = styled(BadgeUnstyled)`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 11px;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum';
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
  position: relative;
  display: inline-block;
  line-height: 1;

  & .MuiBadge-badge {
    visibility : ${props => props.badgeContent === "0" ? "hidden" : "visible"} ;
    z-index: 1300;
    width: 10px;
    height: 10px;
    color: #fff;
    font-weight: 400;
    font-size: 9px;
    text-align : center;
    white-space: nowrap;
    text-align: center;
    background: green;
    border-radius: 10px;
    box-shadow: 0 0 0 1px #fff;
  }

  & .MuiBadge-dot {
    padding: 0;
    z-index: auto;
    min-width: 6px;
    width: 6px;
    height: 6px;
    background: #ff4d4f;
    border-radius: 100%;
    box-shadow: 0 0 0 1px #fff;
  }

  & .MuiBadge-anchorOriginTopRight {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
  }

  & .MuiSvgIcon-root {
    padding : 0px;
    color : white;
    font-size : 10px;
    margin : 0px;
    vertical-align : none;
  }
`;


export default StyledBadge ;