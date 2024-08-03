import { Drawer } from 'vaul';

export const CustomBottomSheet = () => {
	<Drawer.Root shouldScaleBackground>
		<Drawer.Trigger asChild>
			<button>Open Drawer</button>
		</Drawer.Trigger>
		<Drawer.Portal>
			<Drawer.Overlay />
			<Drawer.Content>
				<div className='p-4 bg-white rounded-t-[10px] flex-1'>
					<div className='mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8' />
					<div className='max-w-md mx-auto'>
						<Drawer.Title className='font-medium mb-4'>
							Unstyled drawer for React.
						</Drawer.Title>
						<p className='text-zinc-600 mb-2'>
							This component can be used as a replacement for a Dialog on mobile
							and tablet devices.
						</p>
					</div>
				</div>
			</Drawer.Content>
		</Drawer.Portal>
	</Drawer.Root>;
};
// export const CustomBottomSheet = ({
// 	isOpen,
// 	setIsopen,
// 	children,
// 	adjustPosition,
// }) => {
// 	const modalRef = useRef(null);
// 	const controls = useAnimation();
// 	const mainRef = useRef(null);
// 	const [isScrollable, setIsScrollable] = useState(false);
// 	const [isInView, setIsInView] = useState(true);
// 	const { direction } = useStore((state) => state);

// 	useScrollDirection(mainRef);

// 	function handleDragEnd(e, info) {
// 		const modalHeight = modalRef.current.offsetHeight - 30 - 48 - 72;

// 		if (info.offset.y > modalHeight / 2) {
// 			setIsopen(false);
// 		} else {
// 			controls.start({ y: 0 });
// 		}

// 		// setIsScrollable(true);
// 	}

// 	// function handleDrag(_, info) {
// 	// 	if (isInView && direction === 'up') {
// 	// 		controls.set({y: 150})
// 	// 	} else {
// 	// 		console.log('no');
// 	// 	}
// 	// }

// 	// function hadnleDragStart() {
// 	// 	if (mainRef.current.scrollTop === 0 && direction === 'up') {
// 	// 		setIsScrollable(false);
// 	// 	} else {
// 	// 		setIsScrollable(true);
// 	// 	}
// 	// }

// 	// const handleScroll = (e) => {
// 	// 	if (direction === 'up' && e.target.scrollTop === 0) {
// 	// 		setIsScrollable(false);
// 	// 	}
// 	// };

// 	function handleChangeScrollable() {
// 		if (direction === 'up') {
// 			setIsScrollable(false);
// 		} else {
// 			setIsScrollable(true);
// 		}
// 	}

// 	useEffect(() => {
// 		const content = mainRef?.current;
// 		if (content?.scrollHeight > content?.clientHeight) {
// 			setIsScrollable(true);
// 		}
// 	}, []);

// 	useEffect(() => {
// 		if (isOpen) {
// 			controls.start({ y: adjustPosition ? '-50px' : 0 });
// 		}
// 	}, [isOpen, adjustPosition, controls]);

// 	return (
// 		<AnimatePresence>
// 			{isOpen && (
// 				<>
// 					<motion.div
// 						ref={modalRef}
// 						drag={'y'}
// 						onDragEnd={handleDragEnd}
// 						// onDrag={handleDrag}
// 						// onDragStart={hadnleDragStart}
// 						dragConstraints={{ top: 0, bottom: isScrollable ? 0 : 'none' }}
// 						dragElastic={0}
// 						initial={{ y: '100%' }}
// 						animate={controls}
// 						exit={{ y: '100%' }}
// 						transition={{
// 							duration: 0.4,
// 							ease: 'easeInOut',
// 						}}
// 						className={cls.sheet}>
// 						<div className={cls.sheetBody}>
// 							<header className={cls.sheetHeader}>
// 								<div className='wrapper'>
// 									<button
// 										className={cls.closeBtn}
// 										onClick={() => setIsopen(false)}>
// 										Закрыть
// 									</button>
// 								</div>
// 							</header>
// 							<motion.main
// 								style={{ overflowY: isScrollable ? 'auto' : 'clip' }}
// 								ref={mainRef}
// 								className={cls.sheetMain}>
// 								<motion.div
// 									whileInView={handleChangeScrollable}
// 									style={{ height: 0 }}
// 								/>
// 								{children}
// 							</motion.main>
// 						</div>
// 					</motion.div>
// 					<motion.div
// 						onClick={() => setIsopen(false)}
// 						initial={{ opacity: 0 }}
// 						animate={{ opacity: 1 }}
// 						exit={{ opacity: 0 }}
// 						className={cls.backdrop}
// 					/>
// 				</>
// 			)}
// 		</AnimatePresence>
// 	);
// };
