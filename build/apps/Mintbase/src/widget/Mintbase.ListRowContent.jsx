const image = props.image || "";
const text = props.text;
const RowContent = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  cursor: pointer;
  .imageCard {
    display: inline;
    overflow: hidden;
    border-radius: 9999px;
    width: 1.5rem;
    height: 1.5rem;
  }
  .image {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  .text {
    font-family: "Authentic Sans", sans-serif; /* Assuming 'Authentic Sans' is a custom font */
    font-weight: 900;
    font-size: 0.875rem; /* Assuming 14px */
    line-height: 1rem; /* Assuming 16px */
    @media (max-width: 640px) {
      font-size: 1rem; /* Assuming 16px */
      line-height: 1.125rem; /* Assuming 18px */
    }
  }
`;
const ListRowContent = () => {
  return (
    <RowContent>
      <div className="imageCard">
        <img className="image" src={image} alt="" />
      </div>
      <div className="text">{text}</div>
    </RowContent>
  );
};
return { ListRowContent };
