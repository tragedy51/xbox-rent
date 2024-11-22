import { XboxOne, XboxSeries } from '../../../../assets';

import cls from './ConsolesModal.module.css';
import AccountConsoleModal from '../../UI/AccountConsoleModal/AccountConsoleModal';
import AlertMessage from '../../UI/alert/alert-message';
import { AnimatePresence } from 'framer-motion';

const ConsolesModal = ({
	handleSelectConsole,
	data,
	isOpen,
	setIsOpen,
	alertIsOpen,
	setAlertIsOpen,
}) => {
	return (
		<>
			<AnimatePresence>
				{alertIsOpen && (
					<AlertMessage
						message={'Сохранено'}
						isOpen={alertIsOpen}
						setIsOpen={setAlertIsOpen}
					/>
				)}
			</AnimatePresence>
			<div style={{zIndex: 999999999}}>
				<AccountConsoleModal isOpen={isOpen} setIsopen={setIsOpen}>
					<div className={cls.consoleCardsCont}>
						<div className={cls.consoleCards}>
							<div
								onClick={() => handleSelectConsole('xbox_series_x_s')}
								className={`${cls.consoleCard} ${
									data?.console === 'xbox_series_x_s' ? cls.active : ''
								}`}>
								<XboxSeries width={48} height={64} />
								<span>Xbox Series</span>
							</div>
							<div
								onClick={() => handleSelectConsole('xbox_one')}
								className={`${cls.consoleCard} ${
									data?.console === 'xbox_one' ? cls.active : ''
								}`}>
								<XboxOne width={64} height={64} />
								<span>Xbox One</span>
							</div>
						</div>
					</div>
				</AccountConsoleModal>
			</div>
		</>
	);
};

export default ConsolesModal;
