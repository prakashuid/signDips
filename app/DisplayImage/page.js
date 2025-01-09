"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarGroup, Button } from "@nextui-org/react";
import { Modal, ModalContent, ModalBody, Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, useDisclosure } from "@nextui-org/react";
import confetti from 'canvas-confetti';
import { db } from '../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';
import * as motion from "motion/react-client";
import { Image } from "@nextui-org/react";

function DisplayImage() {
  const [imagesData, setImagesData] = useState([]);
  const [visible, setVisible] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const confettiDefaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensure this runs only on the client side
      const pumpkin = confetti.shapeFromPath({
        path: 'M449.4 142c-5 0-10 .3-15 1a183 183 0 0 0-66.9-19.1V87.5a17.5 17.5 0 1 0-35 0v36.4a183 183 0 0 0-67 19c-4.9-.6-9.9-1-14.8-1C170.3 142 105 219.6 105 315s65.3 173 145.7 173c5 0 10-.3 14.8-1a184.7 184.7 0 0 0 169 0c4.9.7 9.9 1 14.9 1 80.3 0 145.6-77.6 145.6-173s-65.3-173-145.7-173zm-220 138 27.4-40.4a11.6 11.6 0 0 1 16.4-2.7l54.7 40.3a11.3 11.3 0 0 1-7 20.3H239a11.3 11.3 0 0 1-9.6-17.5zM444 383.8l-43.7 17.5a17.7 17.7 0 0 1-13 0l-37.3-15-37.2 15a17.8 17.8 0 0 1-13 0L256 383.8a17.5 17.5 0 0 1 13-32.6l37.3 15 37.2-15c4.2-1.6 8.8-1.6 13 0l37.3 15 37.2-15a17.5 17.5 0 0 1 13 32.6zm17-86.3h-82a11.3 11.3 0 0 1-6.9-20.4l54.7-40.3a11.6 11.6 0 0 1 16.4 2.8l27.4 40.4a11.3 11.3 0 0 1-9.6 17.5z',
        matrix: [0.020491803278688523, 0, 0, 0.020491803278688523, -7.172131147540983, -5.9016393442622945]
      });
      const tree = confetti.shapeFromPath({
        path: 'M120 240c-41,14 -91,18 -120,1 29,-10 57,-22 81,-40 -18,2 -37,3 -55,-3 25,-14 48,-30 66,-51 -11,5 -26,8 -45,7 20,-14 40,-30 57,-49 -13,1 -26,2 -38,-1 18,-11 35,-25 51,-43 -13,3 -24,5 -35,6 21,-19 40,-41 53,-67 14,26 32,48 54,67 -11,-1 -23,-3 -35,-6 15,18 32,32 51,43 -13,3 -26,2 -38,1 17,19 36,35 56,49 -19,1 -33,-2 -45,-7 19,21 42,37 67,51 -19,6 -37,5 -56,3 25,18 53,30 82,40 -30,17 -79,13 -120,-1l0 41 -31 0 0 -41z',
        matrix: [0.03597122302158273, 0, 0, 0.03597122302158273, -4.856115107913669, -5.071942446043165]
      });
      const heart = confetti.shapeFromPath({
        path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z',
        matrix: [0.03333333333333333, 0, 0, 0.03333333333333333, -5.566666666666666, -5.533333333333333]
      });
    }
  }, []);
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

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'signatures'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const sortedData = data.sort((a, b) => b.id - a.id);
        setImagesData(sortedData);

        if (sortedData) {
          setVisible(true);
          setTimeout(() => {
            setVisible(false);
          }, 5000);
        }
      } catch (error) {
        console.error("Error fetching signatures: ", error);
      }
    };

    fetchImages();
    const intervalId = setInterval(fetchImages, 5000);

    return () => clearInterval(intervalId);
  }, []);

  if (visible) {
    setTimeout(handleConfetti, 0);
    setTimeout(handleConfetti, 200);
  }

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
                      src={imagesData[0]?.data?.capImage}
                      width={270}
                    />
                    <Image
                      alt="Most Recent Captured Image"
                      className="object-cover rounded-xl"
                      src={imagesData[0]?.data?.image}
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
          {imagesData.map((item) => (
            <Avatar key={item?.id} size="lg" src={item?.data?.capImage || item?.data?.image} />
          ))}
        </AvatarGroup>
      </div>
    </div>
  );
}

export default DisplayImage;
