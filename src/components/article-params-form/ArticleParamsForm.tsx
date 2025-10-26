import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useEffect } from 'react';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

import {
	ArticleStateType,
	fontFamilyOptions,
	OptionType,
	fontColors,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	currentSettings: ArticleStateType;
	onSettingsChange: (settings: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	currentSettings,
	onSettingsChange,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleForm = () => setIsOpen(!isOpen);
	const [draftSettings, setDraftSettings] = useState(currentSettings);

	useEffect(() => {
		setDraftSettings(currentSettings);
	}, [currentSettings]);

	const Apply = () => {
		onSettingsChange(draftSettings);
	};

	const Reset = () => {
		setDraftSettings(defaultArticleState);
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleForm} />
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						Apply();
					}}>
					<Select
						options={fontFamilyOptions as OptionType[]}
						selected={draftSettings.fontFamilyOption}
						onChange={(selected) =>
							setDraftSettings({
								...draftSettings,
								fontFamilyOption: selected,
							})
						}
						title='Шрифт'
					/>
					<RadioGroup
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={draftSettings.fontSizeOption}
						onChange={(selected) => {
							setDraftSettings({
								...draftSettings,
								fontSizeOption: selected,
							});
						}}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors as OptionType[]}
						selected={draftSettings.fontColor}
						onChange={(selected) =>
							setDraftSettings({
								...draftSettings,
								fontColor: selected,
							})
						}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors as OptionType[]}
						selected={draftSettings.backgroundColor}
						onChange={(selected) =>
							setDraftSettings({
								...draftSettings,
								backgroundColor: selected,
							})
						}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr as OptionType[]}
						selected={draftSettings.contentWidth}
						onChange={(selected) =>
							setDraftSettings({
								...draftSettings,
								contentWidth: selected,
							})
						}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={Reset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={Apply}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
