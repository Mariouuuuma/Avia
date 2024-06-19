import React from "react";

interface UpgradeProps {
  backgroundColor: string;
  imageUrl: string;
  title: string;
  description: string;
  buttonText: string;
}

const Upgrade: React.FC<UpgradeProps> = ({
  backgroundColor,
  imageUrl,
  title,
  description,
  buttonText,
}) => {
  return (
    <div>
      <div className={`card w-96 ${backgroundColor} shadow-xl`}>
        <figure className="px-10 pt-10">
          <img src={imageUrl} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          <div className="card-actions">
            <button className="btn btn-primary">{buttonText}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
