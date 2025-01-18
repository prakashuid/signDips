"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarGroup, Button } from "@nextui-org/react";
import { Modal, ModalContent, ModalBody, Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, useDisclosure } from "@nextui-org/react";
import confetti from 'canvas-confetti';
import * as motion from "motion/react-client";
import { Image } from "@nextui-org/react";
import { combineItemsByCoreIdentifier } from "../utils/helper";

function DisplayImage() {
  const [imagesData, setImagesData] = useState([]);
  const [visible, setVisible] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const confettiDefaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
  };

  const handleConfetti = () => {
    confetti({
      ...confettiDefaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ['star']
    });

    confetti({
      ...confettiDefaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ['circle']
    });
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('/api/handler'); // Replace with your endpoint
  
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  
  //       const data = await response.json();
  //       setDatas(data); // Assuming you're using useState
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  
  //   fetchData();
  // }, []);

  useEffect(() => {

    const fetchImages = async () => {
      try {
        const response = await fetch('/api/file');
        if (!response.ok) {
          throw new Error('Failed to fetch blob URLs');
        }
        const data = await response.json();
        console.log(data);
        const combinedItems = combineItemsByCoreIdentifier(data);
        
        setImagesData(combinedItems);
        setLoading(false);
  
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchImages();
    // const intervalId = setInterval(fetchImages, 5000);

    // return () => clearInterval(intervalId);
  }, []);

  if (visible) {
    setTimeout(handleConfetti, 0);
    setTimeout(handleConfetti, 200);
  }
console.log(imagesData);

  return (
    <div className="flex min-h-screen">
      <Button className="float-right absolute right-0 bottom-0 mb-2 mr-2" onPress={onOpen}>Settings</Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">Drawer Title</DrawerHeader>
              <DrawerBody>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis.</p>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>Close</Button>
                <Button color="primary" onPress={onClose}>Action</Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>

      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1 }}>
        <Modal isOpen={visible} size={"xl"} onOpenChange={onOpenChange}>
          <ModalContent>
            <ModalBody>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, scale: { type: "spring", bounce: 0.5 } }}
                style={{ borderRadius: "50%" }}
              >

                
                {imagesData.length > 0 && (
                  <>
                    <Image
                      alt="Most Recent Captured Image"
                      className="object-cover rounded-xl"
                      src={imagesData[0]?.captured?.url || ""}
                      width={270}
                    />
                    <Image
                      alt="Most Recent Captured Image"
                      className="object-cover rounded-xl"
                      src={imagesData[0]?.signature?.url || ""}
                      width={270}
                    />
                  </>
                )}
              </motion.div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </motion.div>

      <div className="m-5">
        <AvatarGroup isGrid isBordered max={100}>
          {imagesData.map((item, i) => (
            <Avatar key={i} size="lg" src={item?.captured?.url || item?.data?.image} />
          ))}
        </AvatarGroup>
      </div>
    </div>
  );
}

export default DisplayImage;
