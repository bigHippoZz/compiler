/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {core as compilerCore} from '@angular/compiler';
import * as core from '@angular/core';

{
  describe('compiler core', () => {
    it('Attribute should be equal', () => {
      typeExtends<compilerCore.Attribute, core.Attribute>();
      typeExtends<core.Attribute, compilerCore.Attribute>();
      compareRuntimeShape(new core.Attribute('someName'), compilerCore.createAttribute('someName'));
    });

    it('Inject should be equal', () => {
      typeExtends<compilerCore.Inject, core.Inject>();
      typeExtends<core.Inject, compilerCore.Inject>();
      compareRuntimeShape(new core.Inject('someName'), compilerCore.createInject('someName'));
    });

    it('Query should be equal', () => {
      typeExtends<compilerCore.Query, core.Query>();
      typeExtends<core.Query, compilerCore.Query>();
      compareRuntimeShape(
          new core.ContentChild('someSelector'), compilerCore.createContentChild('someSelector'));
      compareRuntimeShape(
          new core.ContentChild('someSelector', {read: 'someRead'}),
          compilerCore.createContentChild('someSelector', {read: 'someRead'}));
      compareRuntimeShape(
          new core.ContentChildren('someSelector'),
          compilerCore.createContentChildren('someSelector'));
      compareRuntimeShape(
          new core.ContentChildren('someSelector', {read: 'someRead', descendants: false}),
          compilerCore.createContentChildren(
              'someSelector', {read: 'someRead', descendants: false}));
      compareRuntimeShape(
          new core.ViewChild('someSelector'), compilerCore.createViewChild('someSelector'));
      compareRuntimeShape(
          new core.ViewChild('someSelector', {read: 'someRead'}),
          compilerCore.createViewChild('someSelector', {read: 'someRead'}));
      compareRuntimeShape(
          new core.ViewChildren('someSelector'), compilerCore.createViewChildren('someSelector'));
      compareRuntimeShape(
          new core.ViewChildren('someSelector', {read: 'someRead'}),
          compilerCore.createViewChildren('someSelector', {read: 'someRead'}));
    });

    it('Directive should be equal', () => {
      typeExtends<compilerCore.Directive, core.Directive>();
      typeExtends<core.Directive, compilerCore.Directive>();
      compareRuntimeShape(new core.Directive({}), compilerCore.createDirective({}));
    });

    it('Component should be equal', () => {
      typeExtends<compilerCore.Component, core.Component>();
      typeExtends<core.Component, compilerCore.Component>();
      compareRuntimeShape(new core.Component({}), compilerCore.createComponent({}));
    });

    it('Pipe should be equal', () => {
      typeExtends<compilerCore.Pipe, core.Pipe>();
      typeExtends<core.Pipe, compilerCore.Pipe>();
      compareRuntimeShape(
          new core.Pipe({name: 'someName'}), compilerCore.createPipe({name: 'someName'}));
    });

    it('NgModule should be equal', () => {
      typeExtends<compilerCore.NgModule, core.NgModule>();
      typeExtends<core.NgModule, compilerCore.NgModule>();
      compareRuntimeShape(new core.NgModule({}), compilerCore.createNgModule({}));
    });

    it('marker metadata should be equal', () => {
      compareRuntimeShape(new core.Injectable(), compilerCore.createInjectable());
      compareRuntimeShape(new core.Optional(), compilerCore.createOptional());
      compareRuntimeShape(new core.Self(), compilerCore.createSelf());
      compareRuntimeShape(new core.SkipSelf(), compilerCore.createSkipSelf());
      compareRuntimeShape(new core.Host(), compilerCore.createHost());
    });

    it('InjectionToken should be equal', () => {
      compareRuntimeShape(
          new core.InjectionToken('someName'), compilerCore.createInjectionToken('someName'));
    });

    it('non const enums should be equal', () => {
      typeExtends<compilerCore.ViewEncapsulation, core.ViewEncapsulation>();
      typeExtends<core.ViewEncapsulation, compilerCore.ViewEncapsulation>();

      typeExtends<compilerCore.ChangeDetectionStrategy, core.ChangeDetectionStrategy>();
      typeExtends<core.ChangeDetectionStrategy, compilerCore.ChangeDetectionStrategy>();

      typeExtends<compilerCore.SecurityContext, core.SecurityContext>();
      typeExtends<core.SecurityContext, compilerCore.SecurityContext>();

      typeExtends<compilerCore.MissingTranslationStrategy, core.MissingTranslationStrategy>();
      typeExtends<core.MissingTranslationStrategy, compilerCore.MissingTranslationStrategy>();
    });

    it('const enums should be equal', () => {
      const expectToBe = (val1: any, val2: any) => expect(val1).toBe(val2);

      expectToBe(compilerCore.NodeFlags.None, core.??NodeFlags.None);
      expectToBe(compilerCore.NodeFlags.TypeElement, core.??NodeFlags.TypeElement);
      expectToBe(compilerCore.NodeFlags.TypeText, core.??NodeFlags.TypeText);
      expectToBe(compilerCore.NodeFlags.ProjectedTemplate, core.??NodeFlags.ProjectedTemplate);
      expectToBe(compilerCore.NodeFlags.CatRenderNode, core.??NodeFlags.CatRenderNode);
      expectToBe(compilerCore.NodeFlags.TypeNgContent, core.??NodeFlags.TypeNgContent);
      expectToBe(compilerCore.NodeFlags.TypePipe, core.??NodeFlags.TypePipe);
      expectToBe(compilerCore.NodeFlags.TypePureArray, core.??NodeFlags.TypePureArray);
      expectToBe(compilerCore.NodeFlags.TypePureObject, core.??NodeFlags.TypePureObject);
      expectToBe(compilerCore.NodeFlags.TypePurePipe, core.??NodeFlags.TypePurePipe);
      expectToBe(compilerCore.NodeFlags.CatPureExpression, core.??NodeFlags.CatPureExpression);
      expectToBe(compilerCore.NodeFlags.TypeValueProvider, core.??NodeFlags.TypeValueProvider);
      expectToBe(compilerCore.NodeFlags.TypeClassProvider, core.??NodeFlags.TypeClassProvider);
      expectToBe(compilerCore.NodeFlags.TypeFactoryProvider, core.??NodeFlags.TypeFactoryProvider);
      expectToBe(
          compilerCore.NodeFlags.TypeUseExistingProvider, core.??NodeFlags.TypeUseExistingProvider);
      expectToBe(compilerCore.NodeFlags.LazyProvider, core.??NodeFlags.LazyProvider);
      expectToBe(compilerCore.NodeFlags.PrivateProvider, core.??NodeFlags.PrivateProvider);
      expectToBe(compilerCore.NodeFlags.TypeDirective, core.??NodeFlags.TypeDirective);
      expectToBe(compilerCore.NodeFlags.Component, core.??NodeFlags.Component);
      expectToBe(
          compilerCore.NodeFlags.CatProviderNoDirective, core.??NodeFlags.CatProviderNoDirective);
      expectToBe(compilerCore.NodeFlags.CatProvider, core.??NodeFlags.CatProvider);
      expectToBe(compilerCore.NodeFlags.OnInit, core.??NodeFlags.OnInit);
      expectToBe(compilerCore.NodeFlags.OnDestroy, core.??NodeFlags.OnDestroy);
      expectToBe(compilerCore.NodeFlags.DoCheck, core.??NodeFlags.DoCheck);
      expectToBe(compilerCore.NodeFlags.OnChanges, core.??NodeFlags.OnChanges);
      expectToBe(compilerCore.NodeFlags.AfterContentInit, core.??NodeFlags.AfterContentInit);
      expectToBe(compilerCore.NodeFlags.AfterContentChecked, core.??NodeFlags.AfterContentChecked);
      expectToBe(compilerCore.NodeFlags.AfterViewInit, core.??NodeFlags.AfterViewInit);
      expectToBe(compilerCore.NodeFlags.AfterViewChecked, core.??NodeFlags.AfterViewChecked);
      expectToBe(compilerCore.NodeFlags.EmbeddedViews, core.??NodeFlags.EmbeddedViews);
      expectToBe(compilerCore.NodeFlags.ComponentView, core.??NodeFlags.ComponentView);
      expectToBe(compilerCore.NodeFlags.TypeContentQuery, core.??NodeFlags.TypeContentQuery);
      expectToBe(compilerCore.NodeFlags.TypeViewQuery, core.??NodeFlags.TypeViewQuery);
      expectToBe(compilerCore.NodeFlags.StaticQuery, core.??NodeFlags.StaticQuery);
      expectToBe(compilerCore.NodeFlags.DynamicQuery, core.??NodeFlags.DynamicQuery);
      expectToBe(compilerCore.NodeFlags.CatQuery, core.??NodeFlags.CatQuery);
      expectToBe(compilerCore.NodeFlags.Types, core.??NodeFlags.Types);

      expectToBe(compilerCore.DepFlags.None, core.??DepFlags.None);
      expectToBe(compilerCore.DepFlags.SkipSelf, core.??DepFlags.SkipSelf);
      expectToBe(compilerCore.DepFlags.Optional, core.??DepFlags.Optional);
      expectToBe(compilerCore.DepFlags.Value, core.??DepFlags.Value);

      expectToBe(compilerCore.InjectFlags.Default, core.InjectFlags.Default);
      expectToBe(compilerCore.InjectFlags.SkipSelf, core.InjectFlags.SkipSelf);
      expectToBe(compilerCore.InjectFlags.Self, core.InjectFlags.Self);
      expectToBe(compilerCore.InjectFlags.Host, core.InjectFlags.Host);
      expectToBe(compilerCore.InjectFlags.Optional, core.InjectFlags.Optional);

      expectToBe(compilerCore.ArgumentType.Inline, core.??ArgumentType.Inline);
      expectToBe(compilerCore.ArgumentType.Dynamic, core.??ArgumentType.Dynamic);

      expectToBe(
          compilerCore.BindingFlags.TypeElementAttribute, core.??BindingFlags.TypeElementAttribute);
      expectToBe(compilerCore.BindingFlags.TypeElementClass, core.??BindingFlags.TypeElementClass);
      expectToBe(compilerCore.BindingFlags.TypeElementStyle, core.??BindingFlags.TypeElementStyle);
      expectToBe(compilerCore.BindingFlags.TypeProperty, core.??BindingFlags.TypeProperty);
      expectToBe(compilerCore.BindingFlags.SyntheticProperty, core.??BindingFlags.SyntheticProperty);
      expectToBe(
          compilerCore.BindingFlags.SyntheticHostProperty,
          core.??BindingFlags.SyntheticHostProperty);
      expectToBe(
          compilerCore.BindingFlags.CatSyntheticProperty, core.??BindingFlags.CatSyntheticProperty);
      expectToBe(compilerCore.BindingFlags.Types, core.??BindingFlags.Types);

      expectToBe(compilerCore.QueryBindingType.First, core.??QueryBindingType.First);
      expectToBe(compilerCore.QueryBindingType.All, core.??QueryBindingType.All);

      expectToBe(compilerCore.QueryValueType.ElementRef, core.??QueryValueType.ElementRef);
      expectToBe(compilerCore.QueryValueType.RenderElement, core.??QueryValueType.RenderElement);
      expectToBe(compilerCore.QueryValueType.TemplateRef, core.??QueryValueType.TemplateRef);
      expectToBe(
          compilerCore.QueryValueType.ViewContainerRef, core.??QueryValueType.ViewContainerRef);
      expectToBe(compilerCore.QueryValueType.Provider, core.??QueryValueType.Provider);

      expectToBe(compilerCore.ViewFlags.None, core.??ViewFlags.None);
      expectToBe(compilerCore.ViewFlags.OnPush, core.??ViewFlags.OnPush);
    });
  });
}

function compareRuntimeShape(a: any, b: any) {
  const keys = metadataKeys(a);
  expect(keys).toEqual(metadataKeys(b));
  keys.forEach(key => {
    expect(a[key]).toBe(b[key]);
  });
  // Need to check 'ngMetadataName' separately, as this is
  // on the prototype in @angular/core, but a regular property in @angular/compiler.
  expect(a.ngMetadataName).toBe(b.ngMetadataName);
}

function metadataKeys(a: any): string[] {
  return Object.keys(a).filter(prop => prop !== 'ngMetadataName' && !prop.startsWith('_')).sort();
}

function typeExtends<T1 extends T2, T2>() {}
