import Tooltip from 'react-bootstrap/Tooltip'
const RenderTooltip = (props) => {
  return (
    <>
      <Tooltip id="button-tooltip" {...props}>
       Simple tooltip
      </Tooltip>
    </>

  )
}

export default RenderTooltip