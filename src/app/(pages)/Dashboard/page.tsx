"use client";

import { checkToken, getBlogItemsByUserId, getToken, loggedInData } from "@/utils/DataServices";
import { IBlogItems } from "@/utils/Interface";
import {
  Button,
  Dropdown,
  DropdownItem,
  FileInput,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
  ListGroup,
} from "flowbite-react";

import React, { useEffect, useState } from "react";
import BlogEntries from "@/utils/BlogEntries.json";
import { useRouter } from "next/navigation";

const page = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  // These useStates ill be for our form
  const [blogTitle, setBlogTitle] = useState<string>("");
  const [blogImage, setBlogImage] = useState<any>();
  const [blogDescription, setBlogDescription] = useState<string>("");
  const [blogCategory, setblogCategory] = useState<string>("");
  const [blogId, setBlogId] = useState<number>();
  const [blogUserId, setBlogUserId] = useState<number>();
  const [blogPublisherName, setBlogPublisherName] = useState<string>("");

  const [edit, setEdit] = useState<boolean>(false);

  const [blogItems, setBlogItems] = useState<IBlogItems[]>(BlogEntries);

  const router = useRouter()

  useEffect(() => {

    const getLoggedInData = async () => {
      // get users info
      const loggedIn = loggedInData()
      console.log(loggedIn)
      setBlogUserId(loggedIn.id)
      setBlogPublisherName(loggedIn.username)

      // get user Blog items
      const userBlogItems = await getBlogItemsByUserId(loggedIn.id, getToken())



      // set blog items in our variables
      setBlogItems(userBlogItems)
    }

    if (!checkToken()) {
      router.push('/')
    } else {
      getLoggedInData()
    }
  }, []);

  // Form Functions
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBlogTitle(e.target.value);

  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBlogDescription(e.target.value);

  const handleCategory = (categories: string) => setblogCategory(categories);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {};

  // Accordion Functions

  const handleShow = () => {
    setOpenModal(true);
    setEdit(false);
  };
  const handleEdit = (items: IBlogItems) => {
    setOpenModal(true);
    setEdit(true);
  };

  const handlePublish = async (items: IBlogItems) => {
    items.isPublished = !items.isPublished;
  };

  const handleDelete = async (items: IBlogItems) => {
    items.isDeleted = true;
  };

  // Save Function

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const item = {};

    setOpenModal(false);

    if (edit) {
    } else {
    }
  };

  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-center text-3xl">Dashboard Page</h1>

        <Button onClick={() => setOpenModal(true)}>AddBlog</Button>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <ModalHeader>{edit ? "Edit Blog Post" : "Add Blog Post"}</ModalHeader>
          <ModalBody>
            <form className="flex max-w-md flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  {/* Title, Image, Description Category, Tags */}
                  <Label htmlFor="Title">Title</Label>
                </div>
                <TextInput
                  id="Title"
                  type="text"
                  placeholder="Title"
                  required
                  onChange={handleTitle}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="descrption">Description</Label>
                </div>
                <TextInput
                  id="Description"
                  placeholder="Description"
                  type="text"
                  required
                  onChange={handleDescription}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Dropdown label="Categories" dismissOnClick={true}>
                    <DropdownItem onClick={() => handleCategory("Jujitsu")}>
                      Jujitsu
                    </DropdownItem>
                    <DropdownItem onClick={() => handleCategory("Jajutsu")}>
                      Jajutsu
                    </DropdownItem>
                    <DropdownItem onClick={() => handleCategory("PooJitsu")}>
                      PooJitsu
                    </DropdownItem>
                  </Dropdown>
                </div>
                <div className="mb-2 block">
                  <Label htmlFor="Image">Image</Label>
                </div>
                <FileInput
                  id="Picture"
                  accept="image/png, image/jpg"
                  placeholder="Chose Picture"
                  onChange={handleImage}
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleSave}> Save and publish </Button>
            <Button onClick={() => handleSave}>Save</Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Accordion alwaysOpen className="w-3xl mt-5">
          <AccordionPanel>
            <AccordionTitle>Published Blog Items</AccordionTitle>
            <AccordionContent>
              <ListGroup>
                {blogItems.map((item: IBlogItems, index: number) => {
                  return (
                    <div key={index}>
                      {item.isPublished && !item.isDeleted && (
                        <div className="flex flex-col p-10">
                          <h2 className="text-3xl">{item.title}</h2>
                          <div className="flex flex-row space-x-3">
                            <button
                              onClick={() => handleEdit(item)}
                              color="blue"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(item)}
                              color="red"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => handlePublish(item)}
                              color="yellow"
                            >
                              Unpublish
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </ListGroup>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel>
            <AccordionTitle>Unpublished Blog Items</AccordionTitle>
            <AccordionContent>
              <ListGroup>
                {blogItems.map((item: IBlogItems, index: number) => {
                  return (
                    <div key={index}>
                      {item.isPublished && !item.isDeleted && (
                        <div className="flex flex-col p-10">
                          <h2 className="text-3xl">{item.title}</h2>
                          <div className="flex flex-row space-x-3">
                            <button
                              onClick={() => handleEdit(item)}
                              color="blue"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(item)}
                              color="red"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => handlePublish(item)}
                              color="yellow"
                            >
                              Unpublish
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </ListGroup>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </main>
  );
};

export default page;
