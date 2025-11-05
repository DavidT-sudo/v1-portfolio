import { Col } from 'react-bootstrap';
import Image, { StaticImageData } from 'next/image';

interface ProjectCardProps {
  name: string;
  description: string;
  imgUrl: StaticImageData | string;
}

export const ProjectCard = ({
  name,
  description,
  imgUrl,
}: ProjectCardProps) => {
  return (
    <Col size={12} sm={6} md={4}>
      <div className="proj-imgbx">
        <Image
          src={imgUrl}
          alt={`${name} project thumbnail`}
          width={500}
          height={400}
          style={{ objectFit: 'cover' }}
          priority={false}
        />
        <div className="proj-txtx">
          <h4>{name}</h4>
          <span>{description}</span>
        </div>
      </div>
    </Col>
  );
};
