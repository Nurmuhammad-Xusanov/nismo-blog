import PropTypes from "prop-types";
import { FC } from "react";

interface Props {
  embedId: string;
}

const YoutubeEmbed: FC<Props> = ({ embedId, }) => (
  <iframe
    className=" w-[682px] h-[383px] "
    src={`https://www.youtube.com/embed/${embedId}`}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    title="Embedded youtube"
  />
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;