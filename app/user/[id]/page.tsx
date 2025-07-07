const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div>
      <h1>User Page: {id}</h1>
    </div>
  );
};

export default UserPage;
