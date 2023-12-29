import { FC, useEffect } from 'react'
import { FieldError } from 'react-hook-form'
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'

import styles from './WYSIWYGEditorLite.module.scss'


const formats = [
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'align',
    'list', 'list',
    'link', "code", "blockquote", "indent", "clean"
];

const colors = ['#000055', '#FF7600', '#222222', '#18222b', '#238633', '#0284c7']


interface Props {
    label      : string
    fieldName  : string
    placeholder: string
    onChange   : (value: string) => void
    value?     : string 
    error?     : FieldError
    processing?: boolean
    className? : string
    isRequired?: boolean
}
export const WYSIWYGEditorLite:FC<Props> = ({ label, fieldName, placeholder, onChange, value, error, processing, isRequired, className = '' }) => {
    
    const toolbar = `toolbar${ fieldName }`

    const { quill , quillRef } = useQuill({
        modules: { toolbar: `#${ toolbar }` }, 
        formats, 
        placeholder
    })

    useEffect(()=>{
        if(value){
            if (quill) {
                quill.clipboard.dangerouslyPasteHTML(value);
            }
        }
    },[quill])


    const textChangeEvent = () => {
        if(quill!.getText().trim() === ''){
            onChange('')
        }else {
            onChange(quill!.root.innerHTML)
        } 
    }

    const selectionChangeEvent = () => {
        if( quill!.hasFocus() ){
            quillRef.current.classList.add(styles['focus'])
        }else {
            quillRef.current.classList.remove(styles['focus'])
        }
    }

    useEffect(() => {
        if (quill) {
            quill.on('text-change', textChangeEvent )
            quill.on('selection-change', selectionChangeEvent )
        }
        
        return () => {
            if(quill){
                quill.off('text-change', textChangeEvent )
                quill.off('selection-change', selectionChangeEvent )
            }
        }
    }, [quill])


    useEffect(()=>{
        quill?.enable(!processing)
    },[quill, processing])

    
    return (
        <div className={ styles['editor-container'] }>
            <label className={ styles['label'] }>{ label } { isRequired && <span className="required-asterisk">*</span> }</label>
            <div className={`${ styles['editor'] } ${ className }`}>
                <div id={ toolbar } className={ styles['editor__toolbar'] }>
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
                    <button className="ql-strike" />

                    <select className="ql-color" defaultValue={"black"} onChange={e => e.persist()}>
                        <option value="black" />
                        <option value="white" />
                        {
                            colors.map( color => (<option key={color} value={color} />) )
                        }
                    </select>
                    <select className="ql-background" defaultValue={"black"} onChange={e => e.persist()}>
                        <option value="black" />
                        <option value="white" />
                        {
                            colors.map( color => (<option key={color} value={color} />) )
                        }
                    </select>

                    <select className="ql-align" defaultValue={""} onChange={e => e.persist()}>
                        <option value="" />
                        <option value="center" />
                        <option value="right" />
                        <option value="justify" />
                    </select>

                    <button className="ql-list" value="bullet" />
                    <button className="ql-list" value="ordered" />

                    <button className="ql-link" />
                    <button className="ql-code" />
                    <button className="ql-blockquote" />

                    <button className="ql-indent" value="+1" />
                    <button className="ql-indent" value="-1" />

                    <button className={`ql-clean ${styles['toolbar__btn-clean']}`}></button>
                </div>
                <div 
                    ref={quillRef}
                    className={ styles['editor__content'] }
                />
            </div>
            {
                error &&
                <p className={`error-message ${ styles['editor__error-message'] }` }>{error.message}</p>
            }
        </div>
    )
}
